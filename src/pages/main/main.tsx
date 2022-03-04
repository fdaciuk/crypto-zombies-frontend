import { lazy, useEffect, useState, Suspense } from 'react'
import { useNavigate, Routes, Route, Link } from 'react-router-dom'
import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

import {
  useAuth,
  getZombiesByOwner,
  useContract,
} from '@/resources'

const CreateZombie = lazy(() => import('@/pages/create-zombie'))
const Army = lazy(() => import('@/pages/army'))
const ZombieDetails = lazy(() => import('@/pages/zombie-details'))
const Eat = lazy(() => import('@/pages/eat'))
const Battle = lazy(() => import('@/pages/battle'))
const Fight = lazy(() => import('@/pages/fight'))

export function Main () {
  const { address } = useAuth()
  const contract = useContract()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function zombiesByOnwner () {
      if (contract === null) {
        return
      }

      const noZombies: string[] = []

      // TODO: Antes de fazer a verificação, exibir um loading
      const result = await pipe(
        TE.tryCatch(
          () => getZombiesByOwner(address)(contract),
          E.toError,
        ),
        TE.fold(
          () => async () => noZombies,
          (result) => async () => result,
        ),
      )()

      navigate(result.length > 0 ? '/army' : '/')
      setLoading(false)
    }

    zombiesByOnwner()
  }, [address, contract, navigate])

  if (loading) {
    return null
  }

  return (
    <>
      <ul>
        <li><Link to='/'>Create Zombie</Link></li>
        <li><Link to='/army'>My Army</Link></li>
        <li><Link to='/army/123'>Zombie 123 details</Link></li>
        <li><Link to='/eat'>Feed Zombie</Link></li>
        <li><Link to='/battle'>Choose your opponent</Link></li>
        <li><Link to='/battle/234'>Fight with Zombie 234</Link></li>
      </ul>

      <Suspense fallback=''>
        <Routes>
          <Route path='/' element={<CreateZombie />} />
          <Route path='/army' element={<Army />} />
          <Route path='/army/:id' element={<ZombieDetails />} />
          <Route path='/eat' element={<Eat />} />
          <Route path='/battle' element={<Battle />} />
          <Route path='/battle/:id' element={<Fight />} />
        </Routes>
      </Suspense>
    </>
  )
}
