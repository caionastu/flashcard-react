import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import React, { ReactElement } from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'
import { Container, Content, DrawerContainer } from './CardsPageStyles'
import { DeckModel } from '../../Models/DeckModel'

interface Menu {
  text: string
  icon: ReactElement
  path: string
}

const CardsPage: React.FC = () => {
  const { id: deckId } = useParams()
  const theme = useTheme()

  // Load from database or get from context (set deck in decks page and get it here)
  const deck: DeckModel = {
    id: '1',
    title: 'Spanish Grammar',
    description: 'Grammar'
  }

  const menus: Menu[] = [
    { text: 'Dashboard', icon: <HomeIcon />, path: 'dashboard' },
    { text: 'Study Now', icon: <HomeIcon />, path: 'study-now' },
    { text: 'Manage Cards', icon: <HomeIcon />, path: 'manage-cards' },
    { text: 'Configuration', icon: <HomeIcon />, path: 'configuration' }
  ]

  return (
    <Container>
      <Drawer
        anchor="left"
        open={true}
        variant="permanent"
        sx={{
          [`& .MuiDrawer-paper`]: {
            zIndex: theme.zIndex.appBar - 1
          }
        }}
      >
        <DrawerContainer>
          <List>
            <ListItem>
              <ListItemText primary={`Deck: ${deck.title}`}></ListItemText>
            </ListItem>

            <Divider />

            {menus.map((menu) => (
              <Link key={menu.text} to={`/decks/${deckId}/${menu.path}`}>
                <ListItem key={menu.text} button>
                  <ListItemIcon>{menu.icon}</ListItemIcon>
                  <ListItemText primary={menu.text}></ListItemText>
                </ListItem>
              </Link>
            ))}
          </List>
        </DrawerContainer>
      </Drawer>
      <Content>
        <Outlet />
      </Content>
    </Container>
  )
}

export default CardsPage
