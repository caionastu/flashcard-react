import React from 'react'
import { DeckModel } from '../../Models/DeckModel'
import Deck from '../Deck'
import { Container } from './DeckListStyles'

interface Props {
  decks: DeckModel[]
}

const DeckList: React.FC<Props> = ({ decks }) => {
  return (
    <Container>
      {decks.map((deck) => (
        <Deck key={deck.id} deck={deck}></Deck>
      ))}
    </Container>
  )
}

export default DeckList
