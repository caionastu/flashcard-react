import {
  CollectionReference,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  Query,
  query,
  QuerySnapshot,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore'
import { CardModel } from '../CardModel'
import { createCollection } from './Firebase'

class CardService {
  cardCollection: CollectionReference<CardModel>

  constructor() {
    this.cardCollection = createCollection<CardModel>('cards')
  }

  async findAll(deckId: string): Promise<CardModel[]> {
    const queryAll = query(this.cardCollection, where('deckId', '==', deckId))
    const snapshot = await getDocs(queryAll)
    return this.transformToCards(snapshot)
  }

  async findToStudy(deckId: string): Promise<CardModel[]> {
    const queryStudy = query(
      this.cardCollection,
      where('deckId', '==', deckId),
      orderBy('lastVisit.nextVisit', 'asc'),
      orderBy('lastVisit.difficulty', 'asc'),
      limit(20)
    )
    const snapshot = await getDocs(queryStudy)
    return this.transformToCards(snapshot)
  }

  async create(card: CardModel): Promise<CardModel> {
    const cardRef = doc(this.cardCollection)
    card.id = cardRef.id
    await setDoc(cardRef, card)
    return card
  }

  async update(card: CardModel): Promise<CardModel> {
    const cardRef = doc(this.cardCollection, card.id)
    await updateDoc(cardRef, card)
    return card
  }

  async updateVisit(card: CardModel): Promise<CardModel> {
    const cardRef = doc(this.cardCollection, card.id)
    await updateDoc(cardRef, {
      lastVisit: card.lastVisit,
      visitCount: card.visitCount
    })
    return card
  }

  async delete(id: string): Promise<void> {
    return await deleteDoc(doc(this.cardCollection, id))
  }

  async deleteByDeckId(deckId: string): Promise<void> {
    const deleteQuery: Query<CardModel> = query(
      this.cardCollection,
      where('deckId', '==', deckId)
    )

    const docs = await getDocs(deleteQuery)
    docs.docs.forEach((doc) => this.delete(doc.id))
  }

  private transformToCards(snaptshot: QuerySnapshot<CardModel>): CardModel[] {
    return snaptshot.docs.map((card) => card.data())
  }
}

export default CardService
