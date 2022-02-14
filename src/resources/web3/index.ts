import Web3 from 'web3/dist/web3.min.js'
import { Contract, ContractSendMethod } from 'web3-eth-contract'
import { cryptoZombiesABI } from './crypto-zombies-abi'

interface CryptoZombiesContract extends Contract {
  methods: {
    zombies (id: string): ContractSendMethod
    zombieToOwner (id: string): ContractSendMethod
    getZombiesByOwner (owner: string): ContractSendMethod
  }
}

export type Zombie = {
  name: string
  dna: string
  level: number
  winCount: number
  lossCount: number
  readyTime: string
}

let cryptoZombiesContract: CryptoZombiesContract

export const createWeb3Instance = (): Web3 => {
  const web3 = window.ethereum

  if (typeof web3 === 'undefined') {
    throw new Error('window.ethereum is not set for web3.js')
  }

  return new Web3(web3.currentProvider)
}

export const createContract = (web3Instance: Web3): CryptoZombiesContract => {
  const myContract = new web3Instance.eth.Contract(
    JSON.parse(cryptoZombiesABI),
    'YOUR_CONTRACT_ADDRESS',
  )
  console.log('myContract:', myContract)
  return myContract
}

export const getZombieDetails = (id: string): Promise<Zombie> => {
  return cryptoZombiesContract.methods.zombies(id).call()
}

export const zombieToOwner = (id: string) => {
  return cryptoZombiesContract.methods.zombieToOwner(id).call()
}

export const getZombiesByOwner = (owner: string): Promise<string[]> => {
  return cryptoZombiesContract.methods.getZombiesByOwner(owner).call()
}

export { Web3, CryptoZombiesContract }
