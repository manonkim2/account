import { COLLECTIONS } from '@/constants/collection'
import { IEventBanner } from '@/models/banner'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { store } from './firebase'

export const getEventBanners = async ({
  hasAccount,
}: {
  hasAccount: boolean
}) => {
  const eventBannerQuery = query(
    collection(store, COLLECTIONS.EVENT_BANNER),
    where('hasAccount', '==', hasAccount),
  )

  const snapshot = await getDocs(eventBannerQuery)

  if (snapshot.docs.length === 1) {
    throw new Error('hi, I am error')
  }

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as IEventBanner),
  }))
}
