import Web3 from 'web3/dist/web3.min.js'
import { TransactionReceipt } from 'web3-core'
import { Contract, ContractSendMethod } from 'web3-eth-contract'
import { cryptoZombiesABI } from './crypto-zombies-abi'

type CreateRandomZombieInput = {
  name: string
  userAccount: string
}

type FeedOnKittyInput = {
  zombieId: string
  kittyId: string
  userAccount: string
}

interface CryptoZombiesContract extends Contract {
  methods: {
    zombies (id: string): ContractSendMethod
    zombieToOwner (id: string): ContractSendMethod
    getZombiesByOwner (owner: string): ContractSendMethod
    createRandomZombie (name: string): ContractSendMethod
    feedOnKitty (zombieId: string, kittyId: string): ContractSendMethod
  }
}

type Zombie = {
  name: string
  dna: string
  level: number
  winCount: number
  lossCount: number
  readyTime: string
}

export type ZombieWithId = Zombie & {
  id: string
}

const CRYPTO_ZOMBIES_ADDRESS = '0xD0E2e469da36eB6764A0829fE7994a8A7d15c570'

export const createWeb3Instance = (): Web3 => {
  const web3 = window.ethereum

  if (typeof web3 === 'undefined') {
    throw new Error('window.ethereum is not set for web3.js')
  }

  return new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'))
  // return new Web3(web3.currentProvider)
}

export const createContract = (web3Instance: Web3): CryptoZombiesContract => {
  const myContract = new web3Instance.eth.Contract(
    JSON.parse(cryptoZombiesABI),
    CRYPTO_ZOMBIES_ADDRESS,
  )
  return myContract
}

export const getZombieDetails = (id: string) => (contract: CryptoZombiesContract): Promise<Zombie> => {
  return contract.methods.zombies(id).call()
}

export const zombieToOwner = (id: string) => (contract: CryptoZombiesContract) => {
  return contract.methods.zombieToOwner(id).call()
}

export const getZombiesByOwner = (owner: string) => (contract: CryptoZombiesContract): Promise<string[]> => {
  return contract.methods.getZombiesByOwner(owner).call()
}

export const isAddress = (address: string) => {
  return Web3.utils.isAddress(address)
}

export const createRandomZombie = (args: CreateRandomZombieInput) => (contract: CryptoZombiesContract): Promise<TransactionReceipt> => {
  return new Promise((resolve, reject) => {
    const { name, userAccount } = args
    return contract.methods.createRandomZombie(name)
      // TODO: dica do semaraugusto: ce pode rodar um estimeTransactionGas
      // antes de mandar o gas pra tentar economizar um pouco
      .send({ from: userAccount, gas: 3000000 })
      .on('receipt', resolve)
      .on('error', reject)
  })
}

export const feedOnKitty = (args: FeedOnKittyInput) => (contract: CryptoZombiesContract): Promise<TransactionReceipt> => {
  return new Promise((resolve, reject) => {
    const { zombieId, kittyId, userAccount } = args
    return contract.methods.feedOnKitty(zombieId, kittyId)
      .send({ from: userAccount, gas: 3000000 })
      .on('receipt', resolve)
      .on('error', reject)
  })
}

export { Web3, CryptoZombiesContract }
