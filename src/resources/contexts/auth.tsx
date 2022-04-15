import {
  createContext,
  useContext,
  ReactNode,
  useCallback,
  useState,
} from 'react'

import { pipe } from 'fp-ts/function'

import {
  getZombiesByOwner,
  isAddress,
  useContract,
  getZombieDetails,
  ZombieWithId,
  CryptoZombiesContract,
} from '@/resources'

type AuthContextType = {
  address: string
  isLoggedIn: boolean
  zombies: ZombieWithId[]
  getZombies: () => Promise<void>
  setAddress: (address: string) => Promise<void>
}

type AuthProviderProps = {
  children: ReactNode | ReactNode[]
}

type GetZombiesByIdsInput = {
  ids: string[]
  contract: CryptoZombiesContract
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [address, setAddress] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [zombies, setZombies] = useState<ZombieWithId[]>([])
  const contract = useContract()

  const getZombiesByIds = async ({ ids, contract }: GetZombiesByIdsInput) => {
    const zombies = ids.map(async zombieId => {
      const zombieDetail = await pipe(contract, getZombieDetails(zombieId))
      return {
        id: zombieId,
        ...zombieDetail,
      }
    })

    const result = await Promise.allSettled(zombies)
    const newZombies = result.reduce<ZombieWithId[]>((acc, r) => {
      if (r.status === 'rejected') {
        return acc
      }

      return acc.concat(r.value)
    }, [])

    setZombies(newZombies)
  }

  const getZombiesIds = useCallback(async (address: string) => {
    if (contract === null) {
      return
    }

    const ids = await pipe(contract, getZombiesByOwner(address))
    await getZombiesByIds({ ids, contract })
  }, [contract])

  const setInternalAddress: AuthContextType['setAddress'] = async (address) => {
    if (!isAddress(address)) {
      throw new Error('This contract address is invalid')
    }

    await getZombiesIds(address)

    setAddress(address)
    setIsLoggedIn(true)
  }

  const getZombies = useCallback(() => {
    return getZombiesIds(address)
  }, [address, getZombiesIds])

  return (
    <AuthContext.Provider
      value={{
        address,
        isLoggedIn,
        zombies,
        getZombies,
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
