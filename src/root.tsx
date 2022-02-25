import { BrowserRouter } from 'react-router-dom'
import { App } from '@/app'
import { AuthProvider } from '@/resources'

export function Root () {
  return (
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  )
}
