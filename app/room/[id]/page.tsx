'use client'; // ✅ This makes the whole page a Client Component

export const dynamic = 'force-dynamic'; // ✅ This disables SSG & SSR

import { Stack } from '@chakra-ui/react';
import { BeforeUnloadAction, RoomPlayGround, useUser } from 'modules';
import { useLeaveRoom } from 'modules/Room/hooks';
import { useParams } from 'next/navigation';

const Store = () => {
  const { id } = useParams<{ id: string }>();
  const { data: userData } = useUser();
  const { upsert: leaveRoom } = useLeaveRoom();

  return (
    <>
      <Stack
        direction={'column'}
        minHeight={'100%'}
        width={'100%'}
        gap={12}
        marginBlockStart={20}
        marginBlockEnd={32}
        alignItems={'center'}
      >
        <RoomPlayGround id={id.toString()} userData={userData} />
        <BeforeUnloadAction
          onBeforeUnload={() => {
            leaveRoom({ roomId: id, userId: userData?.id ?? '' });
          }}
        />
      </Stack>
    </>
  );
};
export default Store;
