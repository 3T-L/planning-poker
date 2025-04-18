'use client';

import { Spinner, Stack, Text } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { UserType } from 'services';
import { useJoinRoom, useRoomInfo } from '../hooks';
import { CardsGroup } from './CardsGroup';
import { RevealButton } from './RevealButton';
import { RoomPlayers } from './RoomPlayers';

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
      <Text fontSize={'4xl'} marginBlockEnd={4} fontWeight={'bold'}>
        {data.name}
      </Text>
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
