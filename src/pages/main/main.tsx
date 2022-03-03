import { lazy, Suspense } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

const CreateZombie = lazy(() => import('@/pages/create-zombie'))
const Army = lazy(() => import('@/pages/army'))
const ZombieDetails = lazy(() => import('@/pages/zombie-details'))
const Eat = lazy(() => import('@/pages/eat'))
const Battle = lazy(() => import('@/pages/battle'))
const Fight = lazy(() => import('@/pages/fight'))

export function Main () {
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
