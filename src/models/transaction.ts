export type TransactionType = 'deposit' | 'withdraw'
export type TransactionFilterType = 'all' | TransactionType

export interface ITransaction {
  userId: string
  type: TransactionType
  amount: number
  balance: number
  displayText: string
  date: string
}
