import { collection, doc, setDoc } from 'firebase/firestore'

import { store } from '@remote/firebase'
import { ITransaction } from '@/models/transaction'
import { COLLECTIONS } from '@/constants/collection'

export function createTransaction(newTrasaction: ITransaction) {
  return setDoc(doc(collection(store, COLLECTIONS.TRANSACTION)), newTrasaction)
}
