import { Button } from '@mui/material'
import React, { useContext } from 'react'
import { AuthContext } from '../../Components/AuthProvider'
import { Container } from './LoginPageStyles'

const LoginPage: React.FC = () => {
  const { login } = useContext(AuthContext)

  return (
    <Container>
      <Button onClick={login}>Login</Button>
    </Container>
  )
}

export default LoginPage
