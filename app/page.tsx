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
import { CreateARoom } from 'modules';
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
        padding={4}
      >
        <Card.Body>
          <Text
            fontSize={'7xl'}
            fontWeight={'bold'}
            width={'80%'}
            lineHeight={'1.2'}
          >
            Enhance Your Project Planning
          </Text>
          <Text
            width={'80%'}
            marginBlockStart={4}
            fontSize={'xl'}
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
        size={'xl'}
        open={openDialog}
        onOpenChange={({ open }) => setOpenDialog(open)}
        placement={'center'}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Start Planning</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <CreateARoom />
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
