import { App } from '@/app'
import { Providers } from './providers'

export function Root () {
  return (
    <Providers>
      <App />
    </Providers>
  )
}
