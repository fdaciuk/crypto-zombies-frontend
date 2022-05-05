import Web3 from 'web3/dist/web3.min.js'
import { TransactionReceipt, PromiEvent } from 'web3-core'
import { Contract, ContractSendMethod } from 'web3-eth-contract'
import { cryptoZombiesABI } from './crypto-zombies-abi'
import { ConnectionError, getEnv } from '@/resources'

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
    getEnv('CRYPTO_ZOMBIES_ADDRESS'),
  )
  return myContract
}

export const getZombieDetails = (id: string) => (contract: CryptoZombiesContract): Promise<Zombie> => {
  return contract.methods.zombies(id).call()
}

export const zombieToOwner = (id: string) => (contract: CryptoZombiesContract) => {
  return contract.methods.zombieToOwner(id).call()
}

export const getZombiesByOwner = (owner: string) => async (contract: CryptoZombiesContract): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const call = 'call'
    contract.methods.getZombiesByOwner(owner)[call]({}, (error, result) => {
      if (
        error instanceof Error &&
        error.message.includes('Invalid JSON RPC response')
      ) {
        return reject(new ConnectionError())
      }

      if (error) {
        return reject(error)
      }

      // TODO: Validar se `result` é, de fato, um array de strings.
      // Se não for, criar uma nova classe de erro ValidationError e dar
      // throw nesse erro.
      return resolve(result)
    })
  })
}

export const isAddress = (address: string) => {
  return Web3.utils.isAddress(address)
}

type Fn = () => PromiEvent<Contract>
const requestOrFail = (fn: Fn): Promise<TransactionReceipt> => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('Connection error'))
    }, 1_500)

    fn()
      .on('receipt', (result) => {
        clearTimeout(timer)
        resolve(result)
      })
      .on('error', error => {
        clearTimeout(timer)
        reject(error)
      })
  })
}

export const createRandomZombie = (args: CreateRandomZombieInput) => (contract: CryptoZombiesContract): Promise<TransactionReceipt> => {
  return requestOrFail(() => {
    const { name, userAccount } = args
    return contract.methods.createRandomZombie(name)
      // TODO: dica do semaraugusto: ce pode rodar um estimeTransactionGas
      // antes de mandar o gas pra tentar economizar um pouco
      .send({ from: userAccount, gas: 3000000 })
  })
}

export const feedOnKitty = (args: FeedOnKittyInput) => (contract: CryptoZombiesContract): Promise<TransactionReceipt> => {
  return requestOrFail(() => {
    const { zombieId, kittyId, userAccount } = args
    return contract.methods.feedOnKitty(zombieId, kittyId)
      .send({ from: userAccount, gas: 3000000 })
  })
}

export { Web3, CryptoZombiesContract }
