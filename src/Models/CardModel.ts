import { Timestamp } from 'firebase/firestore'

export interface CardModel {
  id?: string
  deckId: string
  content: string
  createdAt: Timestamp
  notes?: string
  lastVisit: LastVisit
  visitCount: number
}

export interface LastVisit {
  difficulty: CardStatus
  date: Timestamp
  nextVisit: Timestamp
}

export enum CardStatus {
  NEW = 'NEW',
  EASY = 'EASY',
  MODERATE = 'MODERATE',
  HARD = 'HARD'
}
