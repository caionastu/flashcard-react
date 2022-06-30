import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import {
  CardsTableCell,
  CardsTableContainer,
  Container,
  Header
} from './ManageCardsStyles'
import { CardModel, CardStatus } from '../../../Models/CardModel'
import { useParams } from 'react-router-dom'
import CardService from '../../../Models/Services/CardService'
import { Timestamp } from 'firebase/firestore'
import CardDrawer from '../../../Components/CardDrawer'

const ManageCards: React.FC = () => {
  const { id: deckId } = useParams()
  const service = new CardService()
  const [cards, setCards] = useState<CardModel[]>([])
  const [isCardDrawerOpen, setIsCardDrawerOpen] = useState(false)
  const [updatingCard, setUpdatingCard] = useState<CardModel>()

  function openCardForm(card?: CardModel) {
    if (!isCardDrawerOpen) {
      setIsCardDrawerOpen(false)
      return
    }

    if (card) {
      setUpdatingCard(card)
    } else {
      setUpdatingCard(undefined)
    }

    setIsCardDrawerOpen(true)
  }

  function deleteCard(card: CardModel) {
    if (card.id == undefined) return

    service
      .delete(card.id)
      .then(() => {
        setCards(cards.filter((element) => element.id !== card.id))
      })
      .catch((error) => console.log(error))
  }

  function formatToString(date: Timestamp): string {
    return date.toDate().toLocaleDateString()
  }

  function afterCardCreated(card: CardModel) {
    setCards([...cards, card])
  }

  function afterCardUpdated(card: CardModel) {
    setCards([...cards])
  }

  useEffect(() => {
    if (deckId == undefined) {
      console.error('deckId not found.')
      return
    }

    service
      .findAll(deckId)
      .then((cards) => {
        setCards(cards)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <Container>
      <Header>
        <Typography variant="h5">All Cards</Typography>
        <IconButton onClick={() => setIsCardDrawerOpen(true)}>
          <AddIcon fontSize="large" />
        </IconButton>
      </Header>
      <CardsTableContainer>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <CardsTableCell>Content</CardsTableCell>
              <CardsTableCell>Notes</CardsTableCell>
              <CardsTableCell>Created At</CardsTableCell>
              <CardsTableCell>Last Visit</CardsTableCell>
              <CardsTableCell>Next Visit</CardsTableCell>
              <CardsTableCell>Visits</CardsTableCell>
              <CardsTableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {cards.map((card) => (
              <TableRow key={card.id} hover>
                <TableCell>{card.content}</TableCell>
                <TableCell>{card.notes}</TableCell>
                <TableCell>{formatToString(card.createdAt)}</TableCell>
                <TableCell>
                  {card.lastVisit ? formatToString(card.lastVisit.date) : ''}
                </TableCell>
                <TableCell>
                  {card.lastVisit
                    ? formatToString(card.lastVisit.nextVisit)
                    : ''}
                </TableCell>
                <TableCell>{card.visitCount}</TableCell>
                <TableCell sx={{ width: '100px', paddingRight: '0' }}>
                  <IconButton onClick={() => openCardForm(card)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton onClick={() => deleteCard(card)}>
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardsTableContainer>
      <CardDrawer
        isOpen={isCardDrawerOpen}
        setOpen={setIsCardDrawerOpen}
        updateCard={updatingCard}
        afterCreate={afterCardCreated}
      ></CardDrawer>
    </Container>
  )
}

export default ManageCards
