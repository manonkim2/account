import CardListAddButton from '@/components/shared/test/CardListAddButton'
import EventBannerAddButton from '@/components/shared/test/EventBannerAddButton'
import TransactionForm from '@/components/test/TransactionForm'

const TestPage = () => {
  return (
    <div>
      <EventBannerAddButton />
      <CardListAddButton />
      <TransactionForm />
    </div>
  )
}

export default TestPage
