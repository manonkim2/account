import { collection, doc, setDoc, getDoc } from 'firebase/firestore'

import { store } from '@remote/firebase'
import { ICredit } from '@models/credit'
import { COLLECTIONS } from '@/constants/collection'

export function updateCredit({
  userId,
  creditScore,
}: {
  userId: string
  creditScore: number
}) {
  return setDoc(doc(collection(store, COLLECTIONS.CREDIT), userId), {
    userId,
    creditScore,
  })
}

export async function getCredit(userId: string) {
  const snapshot = await getDoc(
    doc(collection(store, COLLECTIONS.CREDIT), userId),
  )

  if (snapshot.exists() === false) {
    return null
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as ICredit),
  }
}
