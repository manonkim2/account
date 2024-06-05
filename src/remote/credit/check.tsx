import { CHECK_STATUS } from '@/constants/credit'

const CreditCheckPage = () => {
  return (
    <>
      <div>CreditCheckPage</div>
    </>
  )
}

const STATUS_CHECK_MESSAGE = {
  [CHECK_STATUS.READY]: '신용점수 조회를 위해 정보를 준비하고있어요',
  [CHECK_STATUS.PROGRESS]: '신용점수를 조회중입니다. 잠시만 기다려주세요',
  [CHECK_STATUS.COMPLETE]: '신용점수 조회가 완료되었습니다',
}

export default CreditCheckPage
