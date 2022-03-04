import { useEffect, useState } from 'react'
import { pipe } from 'fp-ts/function'

import {
  createWeb3Instance,
  createContract,
  CryptoZombiesContract,
} from '@/resources'

export function useContract () {
  const [contract, setContract] = useState<CryptoZombiesContract | null>(null)

  useEffect(() => {
    pipe(
      createWeb3Instance(),
      createContract,
      setContract,
    )
  }, [])

  return contract
}
