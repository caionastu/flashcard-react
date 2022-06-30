import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../AuthProvider'
import {
  NavContainer,
  NavButton,
  AvatarContainer,
  AvatarIcon,
  Container,
  Logo
} from '../NavBarStyles'

const SignedNavBar: React.FC = () => {
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)
  return (
    <Container>
      <Logo />
      <NavContainer>
        <NavButton onClick={() => navigate('/decks')}>Decks</NavButton>
        <NavButton
          sx={{ margin: '0 16px 0 auto' }}
          onClick={authContext.logout}
        >
          Logout
        </NavButton>
        <AvatarContainer>
          <AvatarIcon>{authContext?.currentUser?.name?.charAt(0)}</AvatarIcon>
        </AvatarContainer>
      </NavContainer>
    </Container>
  )
}

export default SignedNavBar
