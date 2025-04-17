import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { generateUUID } from 'hooks';
import { upsertSession } from 'services';

type CreateRoomPayload = { name: string; id?: string };

export const useUpsertRoom = (
  options?: UseMutationOptions<CreateRoomPayload, Error, CreateRoomPayload>,
) => {
  const { data, mutate, error, reset, isPending } = useMutation<
    CreateRoomPayload,
    Error,
    CreateRoomPayload
  >({
    mutationFn: async ({ id, name }) => {
      const payload = {
        name,
        id: id ?? generateUUID(),
        participants: {},
        revealed: false,
      };
      await upsertSession(payload);
      return payload;
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
