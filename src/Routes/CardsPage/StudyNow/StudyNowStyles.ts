import { Card, CardActions, CardContent, IconButton } from '@mui/material'
import { Box } from '@mui/system'
import styled from 'styled-components'

export const Container = styled(Box)`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const CardContainer = styled(Card)`
  margin-top: 100px;
  width: 560px;
  height: 340px;
  border-radius: 16px;
`

export const Content = styled(CardContent)`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
`

export const Actions = styled(CardActions)`
  display: flex;
  width: 100%;
`

export const DifficultyButtons = styled(Box)`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
`

export const PaginationContainer = styled(Box)`
  margin: 8px auto 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 560px;
`

export const VoiceButton = styled(IconButton)`
  position: absolute;
  right: -5px;
  top: -20px;
`
