import { ArrowBackOutlined } from '@mui/icons-material'
import { Button, Drawer, TextField } from '@mui/material'
import { Timestamp } from 'firebase/firestore'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { CardModel, CardStatus } from '../../Models/CardModel'
import CardService from '../../Models/Services/CardService'
import { Container, Content, Form, Header, Title } from './CardDrawerStyles'

interface Props {
  isOpen: boolean
  updateCard?: CardModel
  setOpen: (isOpen: boolean) => void
  afterCreate?: (card: CardModel) => void
  afterUpdate?: (card: CardModel) => CardModel
}

const CardDrawer: React.FC<Props> = ({
  isOpen,
  updateCard,
  setOpen,
  afterCreate,
  afterUpdate
}) => {
  const { id: deckId } = useParams()
  const [content, setContent] = useState<string>('')
  const [notes, setNotes] = useState<string>('')
  const service = new CardService()

  function handleSubmit() {
    if (deckId == undefined) {
      console.error('deckId not found.')
      return
    }

    if (!(content && content.trim())) {
      console.log('Content is Null or Empty')
      return
    }

    if (updateCard) {
      updateCard.content = content
      updateCard.notes = notes
      service
        .update(updateCard)
        .then(() => {
          if (afterUpdate) afterUpdate(updateCard)
        })
        .catch((error) => console.log(error))
    } else {
      service
        .create({
          deckId: deckId,
          content: content,
          notes: notes,
          createdAt: Timestamp.now(),
          visitCount: 0,
          lastVisit: {
            difficulty: CardStatus.NEW,
            date: Timestamp.now(),
            nextVisit: Timestamp.now()
          }
        })
        .then((card) => {
          if (afterCreate) afterCreate(card)
        })
    }

    setOpen(false)
    cleanInputs()
  }

  function cleanInputs() {
    setContent('')
    setNotes('')
  }

  function close() {
    setOpen(false)
    cleanInputs()
  }

  return (
    <Drawer anchor="right" open={isOpen} onClose={close}>
      <Container>
        <Header>
          <Button
            sx={{ paddingLeft: 0, paddingRight: 0 }}
            size="small"
            startIcon={<ArrowBackOutlined />}
            onClick={() => setOpen(false)}
          >
            Back
          </Button>
        </Header>
        <Content>
          <Title variant="h4">
            {updateCard != undefined ? 'Update Card' : 'Add New Card'}
          </Title>
          <Form>
            <TextField
              size="small"
              autoFocus
              label="Content"
              placeholder="Write what you want to remember"
              name="Card Content"
              required
              inputProps={{ maxLength: 200 }}
              rows="5"
              multiline={true}
              sx={{ marginBottom: '36px' }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></TextField>
            <TextField
              size="small"
              label="Notes"
              placeholder="Write the anwer or why you want to remember it"
              name="Card Notes"
              inputProps={{ maxLength: 200 }}
              rows="5"
              multiline={true}
              sx={{ marginBottom: '36px' }}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></TextField>
            <Button variant="contained" onClick={() => handleSubmit()}>
              {updateCard != undefined ? 'Update' : 'Add'}
            </Button>
          </Form>
        </Content>
      </Container>
    </Drawer>
  )
}

export default CardDrawer
