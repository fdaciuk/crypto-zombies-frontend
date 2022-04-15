import { lazy, useEffect, Suspense } from 'react'
import { useNavigate, Routes, Route, Link } from 'react-router-dom'
import { Box } from '@chakra-ui/react'

import { useAuth } from '@/resources'

const CreateZombie = lazy(() => import('@/pages/create-zombie'))
const Army = lazy(() => import('@/pages/army'))
const ZombieDetails = lazy(() => import('@/pages/zombie-details'))
const Eat = lazy(() => import('@/pages/eat'))
const Battle = lazy(() => import('@/pages/battle'))
const Fight = lazy(() => import('@/pages/fight'))

export function Main () {
  const { address, zombies } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (zombies.length === 0) {
      navigate('/')
    }
  }, [zombies, navigate])

  return (
    <>
      <ul style={{ position: 'absolute', backgroundColor: '#222', padding: '20px', right: 0, bottom: 0 }}>
        <li><Link to='/'>Create Zombie</Link></li>
        <li><Link to='/army'>My Army</Link></li>
        <li><Link to='/army/123'>Zombie 123 details</Link></li>
        <li><Link to='/eat'>Feed Zombie</Link></li>
        <li><Link to='/battle'>Choose your opponent</Link></li>
        <li><Link to='/battle/234'>Fight with Zombie 234</Link></li>
      </ul>

      <Box position='absolute' right='4' top='4' textAlign='right'>
        <p>{address.substring(0, 10)}...</p>
        <p>Score: 10000</p>
      </Box>

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
