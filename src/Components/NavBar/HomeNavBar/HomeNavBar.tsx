import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Logo, NavButton, NavContainer } from '../NavBarStyles'

const HomeNavBar: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <Logo></Logo>
      <NavContainer>
        <NavButton onClick={() => navigate('/')}>Home</NavButton>
        <NavButton onClick={() => navigate('/about-us')}>About Us</NavButton>
        <NavButton
          sx={{ margin: '0 16px 0 auto' }}
          onClick={() => navigate('/login')}
        >
          Login
        </NavButton>
      </NavContainer>
    </Container>
  )
}

export default HomeNavBar
