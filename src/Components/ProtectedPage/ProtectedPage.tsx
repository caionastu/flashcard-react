import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthProvider'
import { SignedNavBar } from '../NavBar'
import { Container } from './ProtectedPageStyles'

const ProtectedPage: React.FC = () => {
  const { signed } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!signed) navigate('/login')
  }, [])

  return (
    <Container>
      <SignedNavBar />
      <Outlet />
    </Container>
  )
}

export default ProtectedPage
