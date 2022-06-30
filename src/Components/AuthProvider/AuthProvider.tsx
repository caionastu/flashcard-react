import { signInWithPopup, signOut, User } from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, googleProvider } from '../../Models/Services/Firebase'
import UserService from '../../Models/Services/UserService'
import { UserModel } from '../../Models/UserModel'

interface AuthContextData {
  signed: boolean
  currentUser: UserModel | undefined
  login: () => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC = ({ children }) => {
  const userService = new UserService()
  const [isUserLoggedIn, setUserLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<UserModel>()
  const navigate = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged((googleUser) => {
      if (googleUser) {
        setCurrentUser(toUserModel(googleUser))
        setUserLoggedIn(true)
        navigate('/decks')
      } else {
        setUserLoggedIn(false)
        setCurrentUser(undefined)
      }
    })
  }, [])

  async function signIn(): Promise<void> {
    try {
      const response = await signInWithPopup(auth, googleProvider)
      const googleUser = response.user
      const user = await userService.findById(googleUser.uid)
      if (user == null) {
        await userService.create(toUserModel(googleUser))
      }
    } catch (error) {
      console.log(`Login Error: ${error}`)
    }
  }

  async function signOut(): Promise<void> {
    await auth.signOut()
    navigate('/')
    return
  }

  function toUserModel(googleUser: User): UserModel {
    return {
      id: googleUser.uid,
      name: googleUser.displayName,
      email: googleUser.email
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signed: isUserLoggedIn,
        currentUser: currentUser,
        login: signIn,
        logout: signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
