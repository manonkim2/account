import { COLLECTIONS } from '@/constants/collection'
import { EVENT_BANNERS } from '@/mock/banner'
import { store } from '@/remote/firebase'
import { collection, doc, writeBatch } from 'firebase/firestore'
import Button from '../Button'

const EventBannerAddButton = () => {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)

    EVENT_BANNERS.forEach((banner) => {
      const bannerRef = doc(collection(store, COLLECTIONS.EVENT_BANNER))

      batch.set(bannerRef, banner)
    })

    await batch.commit()
  }

  return <Button onClick={handleButtonClick}>이벤트 배너 추가</Button>
}

export default EventBannerAddButton
