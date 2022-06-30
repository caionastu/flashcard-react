import { Box, Paper, TextField, Typography } from '@mui/material'
import { styled } from '@mui/system'

export const Container = styled(Box)`
  width: 998px;
  margin: 0 auto;
  padding: 12px;
  min-height: 306px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
export const Header = styled(Box)`
  flex-grow: 1;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 0 12px;
`
export const DrawerContainer = styled(Box)`
  padding: 0 36px 36px 36px;
  height: 100vh;
  width: 500px;
  background-color: #f6f7f9;

  display: flex;
  flex-direction: column;
`

export const DrawerHeader = styled(Box)`
  height: 50px;
  display: flex;
  align-items: center;
`

export const DrawerContent = styled(Paper)`
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
  width: 80%;
  margin: 0 auto;
`

export const InputTitle = styled(TextField)`
  width: 100%;
  margin-bottom: 36px;
`
