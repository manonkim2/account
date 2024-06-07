export interface ITerm {
  id: string
  title: string
  link: string
  mandatory: boolean
}

interface BaseForm {
  id: string
  label: string
  required: boolean
  helpMessage?: string
}

interface TextFiedlForm extends BaseForm {
  type: 'TEXT_FIELD'
}

interface SelectFieldForm extends BaseForm {
  type: 'SELECT'
  options: { label: string; value: string }[]
}

export type AccountForm = TextFiedlForm | SelectFieldForm

type AccountStatus = 'READY' | 'DONE'

export interface IAccount {
  accountName: string
  accountNubmer: number
  balance: number
  email: string
  name: string
  phone: string
  status: AccountStatus
  userId: string
}
