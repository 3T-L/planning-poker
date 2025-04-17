'use client';

import { Stack } from '@chakra-ui/react';
import { ConfirmLeavingDialog, RoomPlayGround } from 'modules';
import { use } from 'react';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Store = ({ params }: PageProps) => {
  const { id } = use(params);
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
        <RoomPlayGround id={id.toString()} />
      </Stack>
      <ConfirmLeavingDialog />
    </>
  );
};
export default Store;
