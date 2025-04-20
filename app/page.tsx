import { Card, Stack, Text } from '@chakra-ui/react';
import { CreateARoomModal } from 'modules';

export default function Page() {
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
            streamline efficiency in agile project management. Join teams
            worldwide to promote collaborative and accurate estimations.
          </Text>
          <CreateARoomModal />
        </Card.Body>
      </Card.Root>
    </Stack>
  );
}
