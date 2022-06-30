import React from 'react'
import { HomeNavBar } from '../../Components/NavBar'
import { Container, Section } from './HomePageStyles'

const HomePage: React.FC = () => {
  return (
    <Container>
      <HomeNavBar></HomeNavBar>
      <Section
        sx={{
          height: 'calc(100vh - 80px)',
          backgroundColor: '#DDA3B2'
        }}
      >
        Imagem e Texto de Apresentação
      </Section>
      <Section
        sx={{
          backgroundColor: '#E3C5BB'
        }}
      >
        Imagem do Aplicativo do lado de Texto
      </Section>
      <Section
        sx={{
          backgroundColor: '#FFADC6'
        }}
      >
        Comece Agora
      </Section>
      <Section
        sx={{
          height: '40vh',
          backgroundColor: '#dfe2cf'
        }}
      >
        Footer
      </Section>
    </Container>
  )
}
export default HomePage
