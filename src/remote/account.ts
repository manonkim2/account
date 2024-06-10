import { collection, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'

import { store } from '@remote/firebase'
import { IAccount } from '@/models/account'
import { COLLECTIONS } from '@/constants/collection'

export function setTerms({
  userId,
  termIds,
}: {
  userId: string
  termIds: string[]
}) {
  return setDoc(doc(collection(store, COLLECTIONS.TERMS), userId), {
    userId,
    termIds,
  })
}

export async function getTerms(userId: string) {
  const snapshot = await getDoc(
    doc(collection(store, COLLECTIONS.TERMS), userId),
  )

  if (snapshot.exists() === false) {
    return null
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as { userId: string; termIds: string[] }),
  }
}

export function createAccount(newAccount: IAccount) {
  return setDoc(
    doc(collection(store, COLLECTIONS.ACCOUNT), newAccount.userId),
    newAccount,
  )
}

export async function getAccount(userId: string) {
  const snapshot = await getDoc(
    doc(collection(store, COLLECTIONS.ACCOUNT), userId),
  )

  if (snapshot.exists() === false) {
    return null
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as IAccount),
  }
}

export const updateAccountBalance = (userId: string, balance: number) => {
  const snapshot = doc(collection(store, COLLECTIONS.ACCOUNT), userId)

  return updateDoc(snapshot, { balance })
}

export const updateTerms = (userId: string, termIds: string[]) => {
  const snapshot = doc(collection(store, COLLECTIONS.TERMS), userId)

  return updateDoc(snapshot, { termIds })
}
