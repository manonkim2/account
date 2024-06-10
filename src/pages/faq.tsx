import ListRow from '@/components/shared/ListRow'
import { COLLECTIONS } from '@/constants/collection'
import { store } from '@/remote/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'

interface IFAQ {
  id: string
  question: string
  answer: string
}

const FAQPage = ({ faqs }: { faqs: IFAQ[] }) => {
  //   const [faqs, setFaqs] = useState<IFAQ[]>([])

  //   useEffect(() => {
  //     getDocs(collection(store, COLLECTIONS.FAQ)).then((snapshot) => {
  //       const faqs = snapshot.docs.map(
  //         (doc) => ({ id: doc.id, ...doc.data() }) as IFAQ,
  //       )

  //       setFaqs(faqs)
  //     })
  //   }, [])

  return (
    <>
      {faqs.map((faq) => (
        <ListRow
          key={faq.id}
          contents={
            <ListRow.Texts title={faq.question} subTitle={faq.answer} />
          }
        />
      ))}
    </>
  )
}

export async function getStaticProps() {
  const snapshot = await getDocs(collection(store, COLLECTIONS.FAQ))

  const faqs = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))

  return {
    props: { faqs },
  }
}

export default FAQPage
