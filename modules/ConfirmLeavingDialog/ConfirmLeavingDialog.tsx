'use client';

import { Button, Dialog, Portal, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

type ConfirmLeavingDialogProps = {
  onConfirmLeave?: () => void;
  onCancelLeave?: () => void;
};

export const ConfirmLeavingDialog: FC<ConfirmLeavingDialogProps> = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);

  // Handle page unload (browser close, refresh)
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e = e || window.event;

      // Cancel the event
      e.preventDefault();

      // Chrome requires returnValue to be set
      e.returnValue = '';

      // Display confirmation dialog
      return '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Custom navigation handling
  useEffect(() => {
    // For Next.js App Router, we need to add client-side navigation prevention
    const handleClick = (e: any) => {
      // Check if it's a link click
      const linkElement = e.target.closest('a');
      if (linkElement && linkElement.getAttribute('href')) {
        // Only intercept if it's not an external link or anchor
        const href = linkElement.getAttribute('href');
        if (
          !href.startsWith('http') &&
          !href.startsWith('#') &&
          !href.startsWith('mailto:')
        ) {
          e.preventDefault();
          setShowModal(true);
          setPendingNavigation(href);
        }
      }
    };
    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [router]);

  // Handle confirmation actions
  const handleConfirmLeave = () => {
    // Unsubscribe from Firebase
    // const dbRef = ref(database, 'your-data-path');
    // off(dbRef);

    // Close modal
    setShowModal(false);

    // Navigate to pending URL if one exists
    if (pendingNavigation) {
      window.location.href = pendingNavigation;
    } else {
      // If no pending navigation (probably browser close), just allow default behavior
      window.removeEventListener('beforeunload', () => {});
    }
  };

  const handleCancelLeave = () => {
    setShowModal(false);
    setPendingNavigation(null);
  };

  return (
    <Dialog.Root open={showModal} placement={'center'}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content marginBlock={32}>
            <Dialog.Header>
              <Text fontSize={'lg'} fontWeight={'bold'}>
                Leave this page?
              </Text>
            </Dialog.Header>
            <Dialog.Body>
              <Text>
                You have an active session. Are you sure you want to leave?
              </Text>
            </Dialog.Body>
            <Dialog.Footer>
              <Button onClick={handleCancelLeave}>Stay on this page</Button>
              <Button onClick={handleConfirmLeave}>Leave page</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
