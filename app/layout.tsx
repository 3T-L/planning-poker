'use client';
import { Container, Flex, Stack, Text } from '@chakra-ui/react';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Config, Navbar } from 'modules';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Provider from './provider';
import './styles.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dehydratedState = dehydrate(queryClient);

  return (
    <html className={inter.className} suppressHydrationWarning>
      <head />
      <body
        style={{
          overflowY: 'scroll',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={dehydratedState}>
            <Provider>
              <Navbar />
              <Container
                maxW="1024px"
                marginInline={'auto'}
                display={'flex'}
                flexGrow={1}
                padding={4}
                paddingBlockStart={'var(--navHeight)'}
              >
                {children}
              </Container>
              <Stack
                backgroundColor={'var(--contentCardBg)'}
                paddingBlock={16}
                paddingInline={32}
                gapY={6}
              >
                <Text
                  fontSize={'6xl'}
                  fontWeight={'bold'}
                  lineHeight={'1.2'}
                  color={'white'}
                  width={'80%'}
                >
                  Boost Productivity with Our Innovation
                </Text>
                <Text
                  width={'80%'}
                  fontSize={'xl'}
                  fontWeight={'light'}
                  color={'white'}
                >
                  At Plan Poker, we are committed to revolutionizing your
                  project planning process with precision and efficiency. Based
                  in Vietnam, our team leverages cutting-edge technology and
                  agile methodologies to deliver an intuitive, user-friendly
                  Planning Poker platform that enhances collaboration and
                  decision-making. By choosing us, you benefit from a
                  streamlined planning experience tailored to drive productivity
                  and innovation within your teams. Trust in Plan Poker to
                  transform complex project challenges into manageable and
                  successful outcomes.
                </Text>
                <Flex
                  marginBlockStart={8}
                  gap={24}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                >
                  <Flex gap={4} alignItems={'center'}>
                    <Image
                      src={'/static/logo.webp'}
                      alt={'Logo'}
                      width={50}
                      height={50}
                    />
                    <Text fontSize={'2xl'} fontWeight={'bold'} color={'white'}>
                      Planning Poker
                    </Text>
                  </Flex>
                  <Text fontSize={'xl'} fontWeight={'light'} color={'white'}>
                    Made by Tue Truong
                  </Text>
                </Flex>
              </Stack>
            </Provider>
            <Config />
            <ReactQueryDevtools initialIsOpen={false} />
          </HydrationBoundary>
        </QueryClientProvider>
      </body>
    </html>
  );
}
