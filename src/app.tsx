import { lazy, useEffect, Suspense } from 'react'
import {
  matchPath,
  useLocation,
  useNavigate,
  Routes,
  Route,
} from 'react-router-dom'
import { useAuth } from '@/resources'

const Login = lazy(() => import('@/pages/login'))
const Main = lazy(() => import('@/pages/main'))

export const App = () => {
  const { isLoggedIn } = useAuth()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const isInLoginRoute = !!matchPath('/login', pathname)
    if (isLoggedIn && isInLoginRoute) {
      navigate('/')
    }

    if (isLoggedIn === false && isInLoginRoute === false) {
      navigate('/login')
    }
  }, [isLoggedIn, pathname, navigate])

  return (
    <>
      <Suspense fallback=''>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/*' element={<Main />} />
        </Routes>
      </Suspense>
    </>
  )
}
