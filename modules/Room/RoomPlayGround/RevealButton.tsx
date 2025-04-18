import { Button } from '@chakra-ui/react';
import { FC } from 'react';
import { SessionType } from 'services';
import { useReveal, useUpsertRoom } from '../hooks';

type RevealButtonProps = {
  roomData: SessionType;
};

export const RevealButton: FC<RevealButtonProps> = ({ roomData }) => {
  const { upsert: revealCards } = useReveal();
  const { upsert: updateRoomData } = useUpsertRoom();
  const { id: roomId, participants = {}, revealed } = roomData;

  const hasSomeVoted = Object.values(participants).some((participant) =>
    Boolean(participant.vote),
  );

  const handleClick = () => {
    if (!revealed && hasSomeVoted)
      return revealCards({
        roomId: roomId,
        revealed: !revealed,
      });
    // handle start new game session
    const payload: SessionType = {
      ...roomData,
      revealed: false,
      participants: Object.fromEntries(
        Object.entries(participants).map(([key, participant]) => [
          key,
          { ...participant, id: key, vote: '' },
        ]),
      ),
    };
    return updateRoomData(payload);
  };

  return (
    <Button disabled={!hasSomeVoted} onClick={handleClick}>
      {revealed ? 'New Game' : 'Reveal Cards'}
    </Button>
  );
};
