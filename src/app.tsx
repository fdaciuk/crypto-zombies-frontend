import { useRef, useEffect, useState } from 'react'
import {
  createWeb3Instance,
  createContract,
  CryptoZombiesContract,
} from '@/resources/web3'

export function App () {
  const web3js = useRef<CryptoZombiesContract>()
  const [userAccount, setUserAccount] = useState('')

  useEffect(() => {
    const web3Instance = createWeb3Instance()
    web3js.current = createContract(web3Instance)
    console.log('accounts.wallet', web3Instance.eth.accounts.wallet)

    const id = setInterval(() => {
      // TODO: Try to improve web3 types and remove `as any`
      const account = (web3Instance.eth.accounts as any)[0]
      if (account !== userAccount) {
        setUserAccount(account)
      }
    }, 100)

    return () => clearInterval(id)
  }, [userAccount])

  return (
    <div>App</div>
  )
}
