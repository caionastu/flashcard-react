import { Button, Drawer, IconButton, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import {
  Container,
  DrawerContainer,
  DrawerContent,
  DrawerHeader,
  Form,
  Header,
  InputTitle,
  Title
} from './DecksPageStyles'
import AddIcon from '@mui/icons-material/Add'
import DeckList from '../../Components/DeckList'
import { ArrowBackOutlined } from '@mui/icons-material'
import { DeckModel } from '../../Models/DeckModel'
import DeckService from '../../Models/Services/DeckService'
import { AuthContext } from '../../Components/AuthProvider'

const DecksPage: React.FC = () => {
  const service = new DeckService()
  const [drawerState, setDrawerState] = useState(false)
  const [decks, setDecks] = useState<DeckModel[]>([])
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>()
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    if (currentUser == undefined) return

    service
      .findAll(currentUser.id)
      .then((decks) => {
        setDecks(decks)
      })
      .catch((error) => console.log(error))
  }, [])

  function handleSubmit() {
    if (!(title && title.trim())) {
      return console.log('Title is empty')
    }

    service
      .create({
        userId: currentUser?.id,
        title: title,
        description: description ? description.trim() : ''
      })
      .then((deck) => {
        setDecks([...decks, deck])
        setDrawerState(false)
      })
      .catch((error) => console.log(error))
  }

  return (
    <Container>
      <Header>
        <Typography variant="h5">Your Decks</Typography>
        <IconButton onClick={() => setDrawerState(true)}>
          <AddIcon fontSize="large" />
        </IconButton>
      </Header>
      <DeckList decks={decks}></DeckList>
      <Drawer
        anchor="right"
        open={drawerState}
        onClose={() => setDrawerState(false)}
      >
        <DrawerContainer>
          <DrawerHeader>
            <Button
              sx={{ paddingLeft: 0, paddingRight: 0 }}
              size="small"
              startIcon={<ArrowBackOutlined />}
              onClick={() => setDrawerState(false)}
            >
              Back
            </Button>
          </DrawerHeader>
          <DrawerContent>
            <Title variant="h4">Add New Deck</Title>
            <Form component="form">
              <InputTitle
                size="small"
                autoFocus
                label="Title"
                placeholder="A title to your deck"
                name="Deck Title"
                inputProps={{ maxLength: 25 }}
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></InputTitle>
              <InputTitle
                multiline={true}
                rows="4"
                size="small"
                label="Description"
                placeholder="Describe what your deck is about"
                name="Deck Title"
                inputProps={{ maxLength: 140 }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></InputTitle>
              <Button onClick={handleSubmit} variant="contained">
                Add
              </Button>
            </Form>
          </DrawerContent>
        </DrawerContainer>
      </Drawer>
    </Container>
  )
}

export default DecksPage
