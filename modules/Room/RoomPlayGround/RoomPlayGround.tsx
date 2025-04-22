'use client';

import { Spinner, Stack, Text } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { UserType } from 'services';
import { useJoinRoom, useRoomInfo } from '../hooks';
import { CardsGroup } from './CardsGroup';
import { RevealButton } from './RevealButton';
import { RoomPlayers } from './RoomPlayers';
import { ShareRoomModal } from './ShareRoomModal';

type RoomPlayGroundProps = {
  id: string;
  userData?: UserType;
};

export const RoomPlayGround = ({ id, userData }: RoomPlayGroundProps) => {
  const { data } = useRoomInfo({ id });
  const { upsert: joinRoom } = useJoinRoom();

  // This is used to prevent calling the joinRoom when user leaving room
  const calledJoinRoomRef = useRef(false);

  useEffect(() => {
    if (!userData) {
      return;
    }
    if (!data) {
      return;
    }
    const isUserInRoom = Boolean(data.participants?.[userData.id]);
    // Check if the user is already in the room
    if (!isUserInRoom && !calledJoinRoomRef.current) {
      joinRoom({ roomId: id, userId: userData.id });
      calledJoinRoomRef.current = true;
      return;
    }
    if (isUserInRoom) {
      calledJoinRoomRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, userData]);

  if (!data) {
    return (
      <Stack height={720} alignItems={'center'} justifyContent={'center'}>
        <Spinner size={'lg'} />
      </Stack>
    );
  }

  if (!userData) {
    return (
      <Text fontWeight={'bold'} fontSize={'lg'} color={'red'}>
        Please set your username first
      </Text>
    );
  }

  return (
    <Stack alignItems={'center'} flex={1} gap={12}>
      <Stack
        direction={'row'}
        alignItems={'center'}
        gap={4}
        height={50}
        position={'fixed'}
        top={15}
        zIndex={200}
        left={'calc(max(50% - 512px, 0px) + 82px)'}
        maxWidth={'calc(min(100%, 1024px) - 168px)'}
      >
        <Text
          fontSize={'lg'}
          md={{ fontSize: 'xl' }}
          lg={{ fontSize: '2xl' }}
          fontWeight={'bold'}
          whiteSpace={'nowrap'}
          textOverflow={'ellipsis'}
          overflow={'hidden'}
        >
          {data.name}
        </Text>
        <ShareRoomModal roomId={id} />
      </Stack>
      <RoomPlayers
        myId={userData.id}
        participants={data.participants ?? {}}
        revealed={data.revealed}
      >
        <Stack>
          <RevealButton roomData={data} />
        </Stack>
      </RoomPlayers>

      <CardsGroup
        userId={userData?.id ?? ''}
        roomId={id}
        revealed={data.revealed}
        participants={data.participants ?? {}}
      />
    </Stack>
  );
};
