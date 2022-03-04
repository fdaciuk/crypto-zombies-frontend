import { useEffect, useState } from 'react'
import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

import {
  useAuth,
  getZombiesByOwner,
  useContract,
  // getZombieDetails,
  // createRandomZombie,
  Zombie,
} from '@/resources'

type ZombieWithId = Zombie & {
  id: string
}

export function Army () {
  const { address } = useAuth()
  const contract = useContract()
  const [zombies, setZombies] = useState<ZombieWithId[]>([])

  useEffect(() => {
    async function zombiesByOnwner () {
      if (contract === null) {
        return
      }

      const result = await pipe(
        TE.tryCatch(
          () => pipe(
            contract,
            getZombiesByOwner(address),
          ),
          E.toError,
        ),
      )()

      console.log('result', result)
    }

    zombiesByOnwner()
  }, [address, contract])

  return (
    <>
      <h1>Army</h1>

      {zombies.map(zombie => (
        <ul key={zombie.id}>
          <li>{zombie.name}</li>
        </ul>
      ))}
    </>
  )
}
