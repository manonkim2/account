import CardListAddButton from '@/components/shared/test/CardListAddButton'
import EventBannerAddButton from '@/components/shared/test/EventBannerAddButton'
import FAQAddButton from '@/components/test/FAQAddButton'
import TransactionForm from '@/components/test/TransactionForm'

const TestPage = () => {
  return (
    <div>
      <EventBannerAddButton />
      <CardListAddButton />
      <TransactionForm />
      <FAQAddButton />
    </div>
  )
}

export default TestPage
