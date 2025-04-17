import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { upsertParticipant } from 'services';

type JoinRoomPayload = { roomId: string; userId: string };

export const useJoinRoom = (
  options?: UseMutationOptions<void, Error, JoinRoomPayload>,
) => {
  const { data, mutate, error, reset, isPending } = useMutation<
    void,
    Error,
    JoinRoomPayload
  >({
    mutationFn: async ({ roomId, userId }) => {
      return upsertParticipant(roomId, {
        id: userId,
        vote: '',
      });
    },
    ...options,
  });
  return {
    data,
    upsert: mutate,
    isPending,
    error,
    reset,
  };
};
