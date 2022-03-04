import {
  createContext,
  useContext,
  ReactNode,
  useState,
} from 'react'
import { isAddress } from '@/resources'

type AuthContextType = {
  address: string
  isLoggedIn: boolean
  setAddress: (address: string) => void
}

type AuthProviderProps = {
  children: ReactNode | ReactNode[]
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [address, setAddress] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const setInternalAddress = (address: string) => {
    if (!isAddress(address)) {
      throw new Error('This contract address is invalid')
    }

    setAddress(address)
    setIsLoggedIn(true)
  }

  return (
    <AuthContext.Provider
      value={{
        address,
        isLoggedIn,
        setAddress: setInternalAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('Você precisa usar o AuthProvider')
  }
  return context
}
