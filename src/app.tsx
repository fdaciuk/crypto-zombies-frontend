import { useRef, useEffect } from 'react'
import { Web3, ethereum, cryptoZombiesABI } from '@/resources/web3'

export function App () {
  const web3js = useRef<Web3>()

  useEffect(() => {
    if (typeof ethereum !== 'undefined') {
      web3js.current = new Web3(ethereum.currentProvider)
      const myContract = new web3js.current.eth.Contract(JSON.parse(cryptoZombiesABI), '')
      console.log('myContract:', myContract)
    }
  }, [])

  return (
    <div>App</div>
  )
}
