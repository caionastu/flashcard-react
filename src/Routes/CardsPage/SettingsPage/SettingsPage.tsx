import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DeckService from '../../../Models/Services/DeckService'
import { Container } from './SettingsPageStyles'

const Settings: React.FC = () => {
  const [open, setOpen] = useState(false)
  const { id } = useParams()
  const service = new DeckService()
  const navigate = useNavigate()

  async function deleteDeck() {
    if (id == undefined) return

    console.log(id)
    await service.delete(id)
    navigate('/decks')
  }

  return (
    <Container>
      <Button variant="outlined" color="error" onClick={() => setOpen(true)}>
        Delete
      </Button>

      <Dialog open={open}>
        <DialogTitle id="alert-dialog-title">
          {'Do you want to delete the Deck and all its Cards?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you delete the Deck, all of its cards will be deleted too, and
            it's not possible to recover them later.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            autoFocus
            color="error"
            onClick={deleteDeck}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Settings
