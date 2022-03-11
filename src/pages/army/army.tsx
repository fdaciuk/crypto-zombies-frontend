import { useEffect, useState, useCallback } from 'react'
import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { Zombie } from '@/ui'

import {
  useAuth,
  getZombiesByOwner,
  useContract,
  getZombieDetails,
  // createRandomZombie,
  ZombieWithId,
  CryptoZombiesContract,
} from '@/resources'

type GetZombiesByIdsInput = {
  ids: string[]
  contract: CryptoZombiesContract
}

export function Army () {
  const { address } = useAuth()
  const contract = useContract()
  const [zombies, setZombies] = useState<ZombieWithId[]>([])

  const getZombiesByIds = useCallback(async ({ ids, contract }: GetZombiesByIdsInput) => {
    const zombies = ids.map(async zombieId => {
      const zombieDetail = await getZombieDetails(zombieId)(contract)
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
  }, [])

  useEffect(() => {
    async function getZombiesIds () {
      if (contract === null) {
        return
      }

      await pipe(
        TE.tryCatch(
          () => pipe(
            contract,
            getZombiesByOwner(address),
          ),
          E.toError,
        ),
        TE.map(ids => getZombiesByIds({ ids, contract })),
      )()
    }

    getZombiesIds()
  }, [address, contract, getZombiesByIds])

  return (
    <>
      <h1>Army</h1>

      <ul>
        {zombies.map(data => (
          <Zombie key={data.id} data={data} />
        ))}
      </ul>
    </>
  )
}
