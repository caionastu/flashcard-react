import { AppBar, Avatar, Box, Button } from '@mui/material'
import { styled } from '@mui/system'

export const Container = styled(AppBar)(({ theme }) => ({
  position: 'fixed',
  boxShadow: 'none',
  height: '80px',
  display: 'flex',
  flexDirection: 'row'
}))

export const Logo = styled(Box)`
  width: 250px;
  height: 100%;
  background-color: lightblue;
`
export const NavContainer = styled(Box)`
  flex-grow: 1;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`
export const NavButton = styled(Button)(({ theme }) => ({
  color: 'black',
  height: '100%',
  padding: '0px 16px',
  borderRadius: '0px',
  '&:hover': {
    backgroundColor: theme.palette.primary.light
  }
}))

export const AvatarContainer = styled(Box)`
  height: 100%;
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const AvatarIcon = styled(Avatar)`
  width: 56px;
  height: 56px;
`
