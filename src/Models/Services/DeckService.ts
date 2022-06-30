import {
  CollectionReference,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where
} from 'firebase/firestore'
import { DeckModel } from '../DeckModel'
import CardService from './CardService'
import { createCollection } from './Firebase'

class DeckService {
  deckCollection: CollectionReference<DeckModel>
  cardService: CardService = new CardService()

  constructor() {
    this.deckCollection = createCollection<DeckModel>('decks')
  }

  async findAll(userId: string): Promise<DeckModel[]> {
    const deckQuery = query(this.deckCollection, where('userId', '==', userId))
    const snapshot = await getDocs(deckQuery)
    return snapshot.docs.map((deck) => deck.data())
  }

  async create(deck: DeckModel): Promise<DeckModel> {
    const docRef = doc(this.deckCollection)
    deck.id = docRef.id
    await setDoc(docRef, deck)
    return deck
  }

  async delete(id: string): Promise<void> {
    await this.cardService.deleteByDeckId(id)
    return await deleteDoc(doc(this.deckCollection, id))
  }
}

export default DeckService
