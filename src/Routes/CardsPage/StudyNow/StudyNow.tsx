import {
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import {
  Actions,
  CardContainer,
  Container,
  Content,
  DifficultyButtons,
  PaginationContainer,
  VoiceButton
} from './StudyNowStyles'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import SpatialAudioOffIcon from '@mui/icons-material/SpatialAudioOff'
import { useParams } from 'react-router-dom'
import { CardModel, CardStatus } from '../../../Models/CardModel'
import CardService from '../../../Models/Services/CardService'
import { Timestamp } from 'firebase/firestore'

const StudyNow: React.FC = () => {
  const { id: deckId } = useParams()
  const service = new CardService()
  const [cards, setCards] = useState<CardModel[]>([])
  const [index, setIndex] = useState<number>(0)
  const [card, setCard] = useState<CardModel | undefined>(cards[index])
  const [showNotes, setShowNotes] = useState<boolean>(false)

  const speech = new SpeechSynthesisUtterance()
  speech.rate = 0.8
  speech.lang = 'en'

  function nextCard() {
    const nextIndex = index + 1

    if (index > cards.length - 1) {
      setCard(undefined)
      return
    }

    changeCard(nextIndex)
  }

  function changeCard(index: number) {
    const nextCard = cards[index]
    setIndex(index)
    setCard(nextCard)
    setShowNotes(false)
  }

  function playAudio(text: string) {
    speech.text = text
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel()
    }
    window.speechSynthesis.speak(speech)
  }

  function visitCard(difficulty: CardStatus) {
    if (card == undefined) return

    let nextVisit: Date = new Date()
    switch (difficulty) {
      case CardStatus.EASY: {
        nextVisit.setDate(nextVisit.getDate() + 3)
        break
      }
      case CardStatus.MODERATE: {
        nextVisit.setDate(nextVisit.getDate() + 2)
        break
      }
      case CardStatus.HARD: {
        nextVisit.setDate(nextVisit.getDate() + 1)
        break
      }
    }

    card.lastVisit = {
      difficulty: difficulty,
      date: Timestamp.now(),
      nextVisit: Timestamp.fromDate(nextVisit)
    }
    card.visitCount += 1

    service
      .updateVisit(card)
      .then(() => {
        nextCard()
      })
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    if (deckId == undefined) return

    service
      .findToStudy(deckId)
      .then((cards) => {
        setCards(cards)
        setCard(cards[index])
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <Container>
      {!card && (
        <Typography>
          {cards.length === 0
            ? 'Add New Card'
            : 'You finished your study today!!'}
        </Typography>
      )}

      {card && (
        <>
          <CardContainer>
            <Content>
              <List sx={{ height: '100%', width: '100%' }}>
                <ListItem sx={{ height: card.notes ? '49%' : '100%' }}>
                  <Typography
                    variant="h5"
                    sx={{ width: '100%', textAlign: 'center' }}
                  >
                    {card.content}
                  </Typography>

                  <VoiceButton
                    size="small"
                    onClick={() => playAudio(card.content)}
                  >
                    <SpatialAudioOffIcon />
                  </VoiceButton>
                </ListItem>
                {card.notes && (
                  <>
                    <Divider />
                    <ListItem sx={{ height: '49%' }}>
                      {showNotes && (
                        <Typography
                          variant="h5"
                          sx={{ width: '100%', textAlign: 'center' }}
                        >
                          {card.notes}
                        </Typography>
                      )}
                    </ListItem>
                  </>
                )}
                <Divider />
              </List>

              <Actions>
                <Button
                  disabled={card.notes ? false : true}
                  variant="outlined"
                  onClick={() => setShowNotes(!showNotes)}
                >
                  {!showNotes && 'Show Notes'}
                  {showNotes && 'Hide Notes'}
                </Button>

                <DifficultyButtons>
                  <Button
                    variant="outlined"
                    sx={{ marginRight: '16px' }}
                    onClick={() => visitCard(CardStatus.EASY)}
                  >
                    Easy
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ marginRight: '16px' }}
                    onClick={() => visitCard(CardStatus.MODERATE)}
                  >
                    Moderate
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => visitCard(CardStatus.HARD)}
                  >
                    Hard
                  </Button>
                </DifficultyButtons>
              </Actions>
            </Content>
          </CardContainer>

          <PaginationContainer>
            <Typography>
              {index + 1} / {cards.length}
            </Typography>
          </PaginationContainer>
        </>
      )}
    </Container>
  )
}

export default StudyNow
