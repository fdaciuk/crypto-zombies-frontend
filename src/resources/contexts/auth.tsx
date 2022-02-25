import { createContext, useContext, ReactNode, useState } from 'react'

type AuthContextType = {
  address: string
  setAddress: (address: string) => void
}

type AuthProviderProps = {
  children: ReactNode | ReactNode[]
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [address, setAddress] = useState('')

  const setInternalAddress = (address: string) => {
    setAddress(address)
  }

  return (
    <AuthContext.Provider value={{ address, setAddress: setInternalAddress }}>
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
