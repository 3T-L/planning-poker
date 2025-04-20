'use client';

import {
  Button,
  Card,
  CloseButton,
  Dialog,
  Portal,
  Stack,
  Text,
} from '@chakra-ui/react';
import { CreateARoomModal } from 'modules';
import { useState } from 'react';

export default function Page() {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <Stack
      direction={'column'}
      minHeight={'100%'}
      width={'100%'}
      justifyContent={'center'}
      alignItems={'center'}
      gap={40}
      marginBlock={40}
    >
      <Card.Root
        borderRadius={'2xl'}
        backgroundColor={'rgb(0, 0, 0, 0.1)'}
        padding={2}
        marginInline={'2'}
        md={{
          padding: 4,
        }}
      >
        <Card.Body>
          <Text
            fontSize={'4xl'}
            md={{
              fontSize: '5xl',
            }}
            lg={{
              fontSize: '6xl',
            }}
            fontWeight={'bold'}
            width={'80%'}
            lineHeight={'1.2'}
          >
            Enhance Your Project Planning
          </Text>
          <Text
            width={'80%'}
            marginBlockStart={4}
            fontSize={'md'}
            md={{
              fontSize: 'lg',
            }}
            lg={{
              fontSize: 'xl',
            }}
            fontWeight={'light'}
          >
            Revolutionize your team&apos;s approach with Plan Poker, designed to
            streamline efficiency in agile project management. Join teams across
            Vietnam in fostering collaborative, accurate estimations.
          </Text>
          <Button
            width={'fit-content'}
            marginBlockStart={4}
            fontWeight={'semibold'}
            size={'xl'}
            onClick={() => {
              setOpenDialog(!openDialog);
            }}
          >
            START NOW
          </Button>
        </Card.Body>
      </Card.Root>
      <Dialog.Root
        size={'md'}
        open={openDialog}
        onOpenChange={({ open }) => setOpenDialog(open)}
        placement={'center'}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Body>
                <CreateARoomModal />
              </Dialog.Body>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Stack>
  );
}
