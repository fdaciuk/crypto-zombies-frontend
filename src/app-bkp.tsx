import { useRef, useEffect, useState, FormEvent } from 'react'

import {
  createWeb3Instance,
  createContract,
  getZombiesByOwner,
  getZombieDetails,
  createRandomZombie,
  feedOnKitty,
  CryptoZombiesContract,
  Zombie,
} from '@/resources/web3'

type ZombieWithId = Zombie & {
  id: string
}

// const INITIAL_USER_ACCOUNT = ''
const INITIAL_USER_ACCOUNT = '0x9f61faf7774A04Cb0339A6951F6c5c2D8bb0d595'

export function App () {
  const web3js = useRef<CryptoZombiesContract>()
  const [userAccount, setUserAccount] = useState(INITIAL_USER_ACCOUNT)
  const [transactionStatus, setTransactionStatus] = useState<string | null>(null)
  const [zombies, setZombies] = useState<ZombieWithId[]>([])
  console.log('userAccount', userAccount)

  useEffect(() => {
    const web3Instance = createWeb3Instance()
    web3js.current = createContract(web3Instance)
    console.log('accounts.wallet', web3Instance.eth.accounts.wallet)

    const id = setInterval(() => {
      // TODO: Try to improve web3 types and remove `as any`
      const account = (web3Instance.eth.accounts as any)[0]
      if (account && account !== userAccount) {
        setUserAccount(account)
      }
    }, 100)

    return () => clearInterval(id)
  }, [userAccount])

  useEffect(() => {
    async function zombiesByOwner () {
      const contract = web3js.current
      if (!userAccount || typeof contract === 'undefined') {
        return
      }

      const ids = await getZombiesByOwner(userAccount)(contract)
      const zombies = ids.map(async zombieId => {
        const zombieDetail = await getZombieDetails(zombieId)(contract)
        return {
          id: zombieId,
          ...zombieDetail,
        }
      })

      Promise.allSettled(zombies).then(result => {
        const newZombies = result.reduce<ZombieWithId[]>((acc, r) => {
          if (r.status === 'rejected') {
            return acc
          }

          return acc.concat(r.value)
        }, [])

        setZombies(newZombies)
      })
    }

    zombiesByOwner()
  }, [userAccount])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (transactionStatus !== null) {
        setTransactionStatus(null)
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [transactionStatus])

  type MyFormElement = {
    elements:
      { zombieName: HTMLInputElement
    }
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement & MyFormElement>) => {
    e.preventDefault()
    const name = e.currentTarget.elements.zombieName.value
    createZombie(name)
  }

  const createZombie = async (name: string) => {
    if (typeof web3js.current === 'undefined') {
      return
    }

    try {
      const result = await createRandomZombie({ name, userAccount })(web3js.current)
      console.log('receipt:', result)
    } catch (error) {
      if (error instanceof Error) {
        console.log('error:', error.stack)
        setTransactionStatus(error.message)
      }
    }
    console.log('zombie name:', name)
  }

  return (
    <>
      {!!transactionStatus && <p>{transactionStatus}</p>}

      <form onSubmit={handleSubmit}>
        <input type='text' name='zombieName' placeholder='Zombie name' />
        <button type='submit'>
          Create zombie
        </button>
      </form>

      {zombies.map(zombie => (
        <div key={zombie.id}>
          <ul>
            <li>Name: {zombie.name}</li>
            <li>DNA: {zombie.dna}</li>
            <li>Level: {zombie.level}</li>
            <li>Wins: {zombie.winCount}</li>
            <li>Losses: {zombie.lossCount}</li>
            <li>Ready Time: {zombie.readyTime}</li>
          </ul>
        </div>
      ))}
    </>
  )
}
