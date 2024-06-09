export type TransactionType = 'diposit' | 'withdraw'

export interface ITransaction {
  userId: string
  type: TransactionType
  amount: number
  balance: number
  displayText: string
  date: string
}
