import { useRef, useEffect } from 'react'
import {
  createWeb3Instance,
  createContract,
  CryptoZombiesContract,
} from '@/resources/web3'

export function App () {
  const web3js = useRef<CryptoZombiesContract>()

  useEffect(() => {
    web3js.current = createContract(createWeb3Instance())
  }, [])

  return (
    <div>App</div>
  )
}
