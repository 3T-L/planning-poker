import { Flex, Text } from '@chakra-ui/react';
import classNames from 'classNames';
import { useUser } from 'modules/User';
import { FC, PropsWithChildren } from 'react';
import { ParticipantType, SessionType } from 'services';
type RoomPlayersProps = {
  myId: string;
  participants: SessionType['participants'];
  revealed?: boolean;
};

export const RoomPlayers: FC<PropsWithChildren<RoomPlayersProps>> = ({
  myId,
  participants,
  revealed,
  children,
}) => {
  const participantsData = Object.values(participants).filter(Boolean);
  const isRoomHasOneParticipant = participantsData.length === 1;
  const halfOfParticipants = Math.ceil(participantsData.length / 2);

  return (
    <Flex
      gap={6}
      alignItems={'center'}
      direction={'column'}
      justifyContent={'center'}
      flexGrow={1}
      paddingBlock={4}
    >
      <Flex gap={6} wrap={'wrap'} justifyContent={'center'}>
        {participantsData.slice(0, halfOfParticipants).map((participant) => {
          const userId = participant.id;
          const isMe = myId === userId;
          return (
            <Player
              key={`card-user-${userId}`}
              userId={userId}
              isMe={isMe}
              participant={participant}
              revealed={revealed}
            />
          );
        })}
      </Flex>
      {children}
      {!isRoomHasOneParticipant ? (
        <Flex gap={6} wrap={'wrap'} justifyContent={'center'}>
          {participantsData.slice(halfOfParticipants).map((participant) => {
            const userId = participant.id;
            const isMe = myId === userId;
            return (
              <Player
                key={`card-user-${userId}`}
                userId={userId}
                isMe={isMe}
                participant={participant}
                revealed={revealed}
              />
            );
          })}
        </Flex>
      ) : undefined}
    </Flex>
  );
};

const Player: FC<{
  userId: string;
  isMe: boolean;
  participant: ParticipantType;
  revealed?: boolean;
}> = ({ userId, participant, isMe, revealed }) => {
  const { data: userData } = useUser({ id: userId });
  const isVoted = Boolean(participant.vote);
  const displayName = isMe ? 'You' : userData?.displayName ?? 'Unknown';

  return (
    <Flex direction={'column'} gap={2} alignItems={'center'}>
      <div
        className={classNames(
          'card',
          isVoted ? 'wobble-animation card-voted' : '',
          revealed ? '' : 'card-hidden',
        )}
      >
        <div className="back"></div>
        <div className="front">
          <Text fontSize={'4xl'} margin={'auto'} fontWeight={'bold'}>
            {participant.vote || '--'}
          </Text>
        </div>
      </div>
      <Text fontWeight={'light'} fontSize={'md'}>
        {displayName}
      </Text>
    </Flex>
  );
};
