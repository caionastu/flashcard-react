import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography
} from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { DeckModel } from '../../Models/DeckModel'
import { Container, Content } from './DeckStyles'

interface Props {
  deck: DeckModel
}

const Deck: React.FC<Props> = ({ deck }) => {
  const navigate = useNavigate()

  function navigateDeck() {
    navigate(`/decks/${deck.id}`)
  }

  return (
    <Container>
      <CardActionArea onClick={navigateDeck}>
        <CardHeader title={deck.title} maxLength={25}></CardHeader>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {deck.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Container>
  )
}

export default Deck
