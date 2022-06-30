import { Box, TableCell, TableContainer, Typography } from '@mui/material'
import styled from 'styled-components'

export const Container = styled(Box)`
  height: 100%;
  padding: 0 16px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1024px;
`

export const CardsTableContainer = styled(TableContainer)`
  max-height: 500px;
  background-color: white;
`

export const CardsTableCell = styled(TableCell)`
  background-color: #f6f7f9;
`

export const Header = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
`
