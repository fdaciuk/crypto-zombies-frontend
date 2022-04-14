import { lazy, useEffect, useState, Suspense } from 'react'
import { useNavigate, Routes, Route, Link } from 'react-router-dom'
import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

import {
  useAuth,
  getZombiesByOwner,
  useContract,
  ConnectionError,
} from '@/resources'

const CreateZombie = lazy(() => import('@/pages/create-zombie'))
const Army = lazy(() => import('@/pages/army'))
const ZombieDetails = lazy(() => import('@/pages/zombie-details'))
const Eat = lazy(() => import('@/pages/eat'))
const Battle = lazy(() => import('@/pages/battle'))
const Fight = lazy(() => import('@/pages/fight'))

export function Main () {
  const { zombies } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    function navigation () {
      if (zombies.length > 0) {
        navigate('/army')
        return
      }

      navigate('/')
    }

    navigation()
  }, [zombies, navigate])

  return (
    <>
      <ul style={{ position: 'absolute', backgroundColor: '#222', padding: '20px', right: 0 }}>
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
