'use client';

import { Stack } from '@chakra-ui/react';
import { BeforeUnloadAction, RoomPlayGround, useUser } from 'modules';
import { useLeaveRoom } from 'modules/Room/hooks';
import { use } from 'react';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Store = ({ params }: PageProps) => {
  const { id } = use(params);
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
