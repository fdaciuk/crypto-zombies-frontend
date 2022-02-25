import { lazy, Suspense } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useAuth } from '@/resources'

const Login = lazy(() => import('@/pages/login'))
const Main = lazy(() => import('@/pages/main'))

export function App () {
  const { address } = useAuth()
  console.warn('TODO: validar address antes de redirecionar para dentro do app', address)

  return (
    <>
      <ul>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/'>Main</Link></li>
      </ul>

      <Suspense fallback=''>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/*' element={<Main />} />
        </Routes>
      </Suspense>
    </>
  )
}
