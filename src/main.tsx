import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Root } from '@/root'

const container = document.querySelector('[data-js="root"]')
const app = (
  <StrictMode>
    <Root />
  </StrictMode>
)

if (!container) {
  throw new Error('Container <div data-js="root" /> does not exist')
}

const root = createRoot(container)
root.render(app)
