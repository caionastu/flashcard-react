import { Box, Paper, styled, Typography } from '@mui/material'

export const Container = styled(Box)`
  padding: 0 36px 36px 36px;
  height: 100vh;
  width: 500px;
  background-color: #f6f7f9;

  display: flex;
  flex-direction: column;
`

export const Header = styled(Box)`
  height: 50px;
  display: flex;
  align-items: center;
`

export const Content = styled(Paper)`
  flex-grow: 1;
  padding: 36px 0px;
`

export const Title = styled(Typography)`
  width: 100%;
  text-align: center;
  margin-bottom: 36px;
`
export const Form = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 80%;
  margin: 0 auto;
`
