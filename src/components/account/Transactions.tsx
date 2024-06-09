import { parseISO, format } from 'date-fns'

import ListRow from '@shared/ListRow'
import Text from '@shared/Text'
import useTransactions from './hooks/useTransactions'
import addDelimiter from '@/utils/addDelimiter'
import Flex from '../shared/Flex'
import withSuspense from '../shared/hooks/withSuspense'
import Link from 'next/link'
import Button from '../shared/Button'

const Transactions = () => {
  const { data } = useTransactions({ suspense: true })

  const transactions = data?.pages
    .map(({ items }) => items)
    .flat()
    .slice(0, 5)

  return (
    <div>
      <Text bold style={{ padding: 24 }}>
        입출금 내역
      </Text>

      {transactions?.length === 0 ? (
        <Flex style={{ padding: 24 }}>
          <Text>입출금 내역이 없습니다.</Text>
        </Flex>
      ) : (
        <ul>
          {transactions?.map((transaction) => {
            const 입금 = transaction.type === 'diposit'

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
      )}
      <Link href={'/account/transactions'}>
        <Button full size="medium" weak>
          자세히 보기
        </Button>
      </Link>
    </div>
  )
}

export default withSuspense(Transactions, { fallback: <div>Loading...</div> })
