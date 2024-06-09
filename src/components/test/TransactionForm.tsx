import { ChangeEvent, useState } from 'react'

import { getAccount, updateAccountBalance } from '@/remote/account'
import Button from '@shared/Button'
import Flex from '@shared/Flex'
import Select from '@shared/Select'
import TextField from '@shared/TextField'
import { ITransaction } from '@/models/transaction'
import { createTransaction } from '@/remote/transaction'

const TransactionForm = () => {
  const [formValues, setformValues] = useState({
    userId: '',
    type: 'diposit',
    amount: '',
    displayText: '',
  })

  const handleFormValues = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setformValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async () => {
    const account = await getAccount(formValues.userId)

    if (!account) {
      window.alert('해당 유저는 계좌를 보유하고 있지 않습니다.')
      return
    }

    if (
      formValues.type === 'withdraw' &&
      account.balance - Number(formValues.amount) < 0
    ) {
      window.alert(
        `현재 잔액은 ${account.balance}원 입니다. 잔액이 부족합니다.`,
      )
    }

    const balance =
      formValues.type === 'withdraw'
        ? account.balance - Number(formValues.amount)
        : account.balance + Number(formValues.amount)

    const newTransaction = {
      ...formValues,
      amount: Number(formValues.amount),
      date: new Date().toISOString(),
      balance,
    } as ITransaction

    await Promise.all([
      createTransaction(newTransaction),
      updateAccountBalance(formValues.userId, balance),
    ])

    window.alert('입출금 데이터 생성 완료')
  }

  return (
    <div style={{ padding: 30 }}>
      <Flex direction="column">
        <TextField
          label="아이디"
          name="userId"
          value={formValues.userId}
          onChange={handleFormValues}
        />

        <Select
          name="type"
          value={formValues.type}
          onChange={handleFormValues}
          options={[
            { label: '입금', value: 'deposit' },
            { label: '출금', value: 'withdraw' },
          ]}
        />
        <TextField
          label="입출금 금액"
          name="amount"
          value={formValues.amount}
          onChange={handleFormValues}
        />
        <TextField
          label="노출할 텍스트"
          name="displayText"
          value={formValues.displayText}
          onChange={handleFormValues}
        />
        <Button onClick={handleSubmit}>
          {formValues.type === 'deposit' ? '입금' : '출금'}
        </Button>
      </Flex>
    </div>
  )
}

export default TransactionForm
