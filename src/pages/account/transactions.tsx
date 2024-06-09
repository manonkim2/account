import useTransactions from '@/components/account/hooks/useTransactions'
import Flex from '@/components/shared/Flex'
import withAuth from '@/components/shared/hooks/withAuth'
import ListRow from '@/components/shared/ListRow'
import Text from '@/components/shared/Text'
import { TransactionFilterType } from '@/models/transaction'
import { IUser } from '@/models/user'
import addDelimiter from '@/utils/addDelimiter'
import { format, parseISO } from 'date-fns'
import { GetServerSidePropsContext } from 'next'
import { getSession, useSession } from 'next-auth/react'
import { useCallback, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { dehydrate, QueryClient } from 'react-query'

const FILTERS: Array<{ label: string; value: TransactionFilterType }> = [
  {
    label: '전체',
    value: 'all',
  },
  {
    label: '입금',
    value: 'deposit',
  },
  {
    label: '출금',
    value: 'withdraw',
  },
]

const TransactionPage = () => {
  const [currentFilter, setCurrentFilter] =
    useState<TransactionFilterType>('all')

  const {
    data,
    hasNextPage = false,
    isFetching,
    fetchNextPage,
  } = useTransactions({
    filter: currentFilter,
  })

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return
    }

    fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching])

  const transactions = data?.pages.map(({ items }) => items).flat() ?? []

  return (
    <>
      <Flex as={'ul'} justify="flex-end" style={{ padding: 24 }}>
        {FILTERS.map((filter) => (
          <li
            key={filter.value}
            onClick={() => {
              setCurrentFilter(filter.value)
            }}
          >
            {filter.label}
          </li>
        ))}
      </Flex>

      <InfiniteScroll
        dataLength={transactions.length}
        hasMore={hasNextPage}
        loader={<></>}
        next={loadMore}
        scrollThreshold={'100px'}
      >
        <ul>
          {transactions.map((transaction) => {
            const 입금 = transaction.type === 'deposit'

            return (
              <ListRow
                key={transaction.id}
                contents={
                  <ListRow.Texts
                    title={transaction.displayText}
                    subTitle={format(
                      parseISO(transaction.date),
                      'yyyy-MM-dd HH:mm:SS',
                    )}
                  />
                }
                right={
                  <Flex direction="column" align="flex-end">
                    <Text color={입금 ? 'blue' : 'red'} bold={true}>
                      {입금 ? '+' : '-'} {addDelimiter(transaction.amount)}원
                    </Text>
                    <Text>{addDelimiter(transaction.balance)}원</Text>
                  </Flex>
                }
              />
            )
          })}
        </ul>
      </InfiniteScroll>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  if (session && session.user != null) {
    const client = new QueryClient()

    await client.prefetchInfiniteQuery([
      'transactions',
      (session.user as IUser)?.id as string,
    ])

    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(client))),
      },
    }
  }

  return {
    props: {},
  }
}

export default withAuth(TransactionPage)
