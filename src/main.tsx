import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { App } from '@/app'

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.querySelector('[data-js="root"]'),
)
