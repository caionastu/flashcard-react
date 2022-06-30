import {
  CollectionReference,
  query,
  where,
  getDocs,
  doc,
  setDoc
} from 'firebase/firestore'
import { UserModel } from '../UserModel'
import { createCollection } from './Firebase'

class UserService {
  userCollection: CollectionReference<UserModel>

  constructor() {
    this.userCollection = createCollection<UserModel>('users')
  }

  async findById(id: string): Promise<UserModel | null> {
    const userQuery = query(this.userCollection, where('id', '==', id))
    const snapshot = await getDocs(userQuery)
    if (snapshot.size == 0) return null
    return snapshot.docs[0].data()
  }

  async create(user: UserModel): Promise<UserModel> {
    const userRef = doc(this.userCollection, user.id)
    await setDoc(userRef, user)
    return user
  }
}

export default UserService
