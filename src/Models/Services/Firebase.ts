import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  CollectionReference,
  DocumentData
} from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

export const firebaseApp = initializeApp(firebaseConfig)
export const database = getFirestore(firebaseApp)
export const googleProvider = new GoogleAuthProvider()
export const auth = getAuth(firebaseApp)

export const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(database, collectionName) as CollectionReference<T>
}
