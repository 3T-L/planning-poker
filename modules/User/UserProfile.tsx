import {
  Button,
  Dialog,
  Input,
  Portal,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { LuUserPen, LuUserPlus } from 'react-icons/lu';
import { UserType } from 'services';
import { useUpsertUser, useUser } from './hooks';

export const UserProfile = () => {
  const [open, setOpen] = useState(false);
  const { data, isFetching, refetch } = useUser();

  return (
    <>
      <Stack direction={'row'} alignItems={'center'}>
        {isFetching ? (
          <Spinner size={'md'} />
        ) : (
          <UserProfileDisplay
            data={data}
            onCreate={() => {
              setOpen(true);
            }}
            onUpdate={() => {
              setOpen(true);
            }}
          />
        )}
      </Stack>
      <ModalAddNewUser
        data={data}
        open={open}
        onCreateSuccess={() => {
          setOpen(false);
          refetch();
        }}
        setOpen={setOpen}
      />
    </>
  );
};

const ModalAddNewUser = ({
  open,
  onCreateSuccess,
  setOpen,
  data,
}: {
  data: UserType | undefined;
  open: boolean;
  onCreateSuccess: () => void;
  setOpen: (open: boolean) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const isUpdate = !!data;
  const { upsert, isPending } = useUpsertUser({
    onSuccess: () => {
      onCreateSuccess();
    },
  });

  const handleSaveUser = async () => {
    const name = inputRef.current?.value;
    if (!name) {
      return;
    }
    upsert({
      id: data?.id,
      displayName: name,
    });
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={({ open }) => setOpen(open)}
      placement={'top'}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content marginBlock={32}>
            <Dialog.Header>
              <Text fontSize={'lg'} fontWeight={'bold'}>
                {isUpdate ? 'Update' : 'Create'} Your Profile
              </Text>
            </Dialog.Header>
            <Dialog.Body>
              <Stack direction={'column'} gap={4} alignItems={'flex-end'}>
                <Text
                  fontSize={'xs'}
                  md={{
                    fontSize: 'sm',
                  }}
                  alignSelf={'flex-start'}
                  fontWeight={'light'}
                  marginBlockEnd={-2}
                >
                  Simply provide your display name.
                </Text>
                <Input
                  placeholder="Enter your name"
                  ref={inputRef}
                  defaultValue={data?.displayName}
                  fontSize={'md'}
                />
                <Button
                  loading={isPending}
                  onClick={handleSaveUser}
                  width={'fit-content'}
                >
                  Save
                </Button>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer></Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

const UserProfileDisplay = ({
  data,
  onCreate,
  onUpdate,
}: {
  data?: UserType;
  onCreate?: () => void;
  onUpdate?: () => void;
}) => {
  const isHaveUser = !!data;
  if (!isHaveUser) {
    return (
      <Button onClick={onCreate}>
        <Text fontSize={'md'} display={'none'} md={{ display: 'unset' }}>
          Create Your Profile
        </Text>
        <LuUserPlus size={16} />
      </Button>
    );
  }
  return (
    <Button onClick={onUpdate} variant={'surface'}>
      <Text fontSize={'md'} display={'none'} md={{ display: 'unset' }}>
        {data.displayName}
      </Text>
      <LuUserPen size={16} />
    </Button>
  );
};
