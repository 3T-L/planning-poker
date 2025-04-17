import { Card, Flex, Spinner, Text } from '@chakra-ui/react';

import { useConfig } from 'modules/Config/hook';
import { SessionType } from 'services';
import { useVote } from '../hooks';

type CardsGroupProps = {
  revealed: boolean;
  roomId: string;
  userId: string;
  participants: SessionType['participants'];
};

const InnerCardsGroup = ({ roomId, userId, participants }: CardsGroupProps) => {
  const { data, isFetching } = useConfig();
  const { upsert: vote, isPending } = useVote();
  const myRecord = participants[userId];
  if (isFetching) return <Spinner size={'lg'} />;

  if (!data) {
    return null;
  }

  const handleCardSelect = (selectedValue: string) => () => {
    vote({
      roomId: roomId,
      userId: userId,
      vote: selectedValue,
    });
  };

  return (
    <Flex marginTop={'auto'} direction={'column'} marginBlockStart={12}>
      <Text textAlign={'center'} mb={2} fontWeight={'light'}>
        Choose your card 👇
      </Text>
      <Flex
        gap="2"
        alignItems={'center'}
        justifyContent={'center'}
        wrap={'wrap'}
      >
        {data.cards.map((card) => {
          const isSelected = myRecord?.vote === card;
          return (
            <Card.Root
              key={`poker-card-${card}`}
              onClick={handleCardSelect(card)}
              flexGrow={0}
              style={{
                border: isSelected ? '3px solid var(--darkCardBg)' : undefined,
              }}
            >
              <Card.Body
                minWidth={'60px'}
                minHeight={'80px'}
                width={'fit-content'}
              >
                <Text margin={'auto'}>{card}</Text>
              </Card.Body>
            </Card.Root>
          );
        })}
      </Flex>
    </Flex>
  );
};

export const CardsGroup = InnerCardsGroup;
