import { Button, Card, Input, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';
import { useUser } from '../User';
import { useJoinRoom, useUpsertRoom } from './hooks';

export const CreateARoom = () => {
  const { data: userData } = useUser();
  const { upsert: createRoom, isPending: creating } = useUpsertRoom();
  const { upsert: joinRoom, isPending: joining } = useJoinRoom();
  const router = useRouter();

  const [roomName, setRoomName] = useState('');
  const [roomId, setRoomId] = useState('');
  const isHaveUserName = !!userData;
  const handleChange =
    (dispatch: Dispatch<SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(event.target.value);

  const handleCreateRoom = async () => {
    if (!userData) {
      return;
    }
    createRoom(
      { name: roomName },
      {
        onSuccess(data) {
          if (data.id) {
            joinRoom(
              {
                roomId: data.id,
                userId: userData.id,
              },
              {
                onSuccess() {
                  router.push(`./room/${data.id}`);
                },
              },
            );
          }
        },
      },
    );
  };

  const handleJoinRoom = async () => {
    if (!userData) {
      return;
    }
    joinRoom(
      {
        roomId,
        userId: userData.id,
      },
      {
        onSuccess() {
          router.push(`/room/${roomId}`);
        },
      },
    );
  };

  if (!isHaveUserName) {
    return (
      <Text fontWeight={'bold'} fontSize={'lg'} color={'red'}>
        Please set your username first
      </Text>
    );
  }

  return (
    <Stack
      direction={'row'}
      gap={8}
      alignItems={'center'}
      flex={1}
      paddingInline={4}
    >
      <Card.Root flexGrow={1} borderRadius={'2xl'} padding={4}>
        <Card.Body display={'flex'} flexDirection={'column'} gap={6}>
          <Text fontSize={'2xl'} fontWeight={'bold'}>
            Create a new Room
          </Text>
          <Input
            value={roomName}
            onChange={handleChange(setRoomName)}
            placeholder="Enter Your Room Name"
          />
          <Button
            width={'fit-content'}
            disabled={!roomName}
            loading={creating || joining}
            onClick={handleCreateRoom}
          >
            Create
          </Button>
        </Card.Body>
      </Card.Root>
      <Card.Root flexGrow={1} borderRadius={'2xl'} padding={4}>
        <Card.Body display={'flex'} flexDirection={'column'} gap={6}>
          <Text fontSize={'2xl'} fontWeight={'bold'}>
            Join a Room
          </Text>
          <Input
            value={roomId}
            onChange={handleChange(setRoomId)}
            placeholder="Enter Your Room ID"
          />
          <Button
            width={'fit-content'}
            disabled={!roomId}
            loading={joining}
            onClick={handleJoinRoom}
          >
            Join Room
          </Button>
        </Card.Body>
      </Card.Root>
    </Stack>
  );
};
