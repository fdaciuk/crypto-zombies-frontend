import { useRef, useEffect, useState } from 'react'

import {
  createWeb3Instance,
  createContract,
  getZombiesByOwner,
  getZombieDetails,
  CryptoZombiesContract,
  Zombie,
} from '@/resources/web3'

type ZombieWithId = Zombie & {
  id: string
}

export function App () {
  const web3js = useRef<CryptoZombiesContract>()
  const [userAccount, setUserAccount] = useState('')
  const [zombies, setZombies] = useState<ZombieWithId[]>([])

  useEffect(() => {
    const web3Instance = createWeb3Instance()
    web3js.current = createContract(web3Instance)
    console.log('accounts.wallet', web3Instance.eth.accounts.wallet)

    const id = setInterval(() => {
      // TODO: Try to improve web3 types and remove `as any`
      const account = (web3Instance.eth.accounts as any)[0]
      if (account !== userAccount) {
        setUserAccount(account)
      }
    }, 100)

    return () => clearInterval(id)
  }, [userAccount])

  useEffect(() => {
    getZombiesByOwner(userAccount).then((ids) => {
      const zombies = ids.map(async zombieId => {
        const zombieDetail = await getZombieDetails(zombieId)
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
    })
  }, [userAccount])

  return (
    <>
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
