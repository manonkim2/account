import useCreditCheck from '@/components/credit/hooks/useCreditCheck'
import FullPageLoader from '@/components/shared/FullPageLoader'
import { CHECK_STATUS } from '@/constants/credit'
import { useAlertContext } from '@/contexts/AlertContext'
import useUser from '@/hooks/useUser'
import { updateCredit } from '@/remote/credit'
import { stat } from 'fs'
import { useState } from 'react'
import { useMutation } from 'react-query'

const CreditCheckPage = () => {
  const { open } = useAlertContext()
  const [readyToPoll, setreadyToPoll] = useState(true)
  const user = useUser()

  const { mutate } = useMutation((creditScore: number) =>
    updateCredit({ creditScore, userId: user?.id as string }),
  )

  const { data: status } = useCreditCheck({
    onSuccess: (credicScore) => {
      setreadyToPoll(false)
      mutate(credicScore)
    },
    onError: () => {
      setreadyToPoll(false)
      open({
        title: '신용점수 조회에 실패했어요.',
        description: '잠시 . 후다시 시도해주세요.',
        onButtonClick: () => {
          window.history.back()
        },
      })
    },
    enabled: readyToPoll,
  })

  return (
    <>
      <FullPageLoader message={STATUS_CHECK_MESSAGE[status ?? 'READY']} />
    </>
  )
}

const STATUS_CHECK_MESSAGE = {
  [CHECK_STATUS.READY]: '신용점수 조회를 위해 정보를 준비하고있어요',
  [CHECK_STATUS.PROGRESS]: '신용점수를 조회중입니다. 잠시만 기다려주세요',
  [CHECK_STATUS.COMPLETE]: '신용점수 조회가 완료되었습니다',
}

export default CreditCheckPage
