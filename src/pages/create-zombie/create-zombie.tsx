import { FormEvent, useState } from 'react'
import {
  Button,
  Center,
  Flex,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react'
import { Navigate } from 'react-router-dom'
import { pipe } from 'fp-ts/function'
import {
  createRandomZombie,
  useAuth,
  useContract,
} from '@/resources'
import { ErrorMessage } from '@/shared'

type FormEventType = FormEvent<HTMLFormElement> & {
  currentTarget: {
    zombieName: HTMLInputElement
  }
}

export function CreateZombie () {
  const { address, zombies, getZombies } = useAuth()
  const contract = useContract()
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEventType) => {
    e.preventDefault()

    if (!contract) {
      return
    }

    const zombieName = e.currentTarget.zombieName.value.trim()

    if (zombieName === '') {
      setError('You must give a name to the Zombie')
      return
    }

    try {
      await pipe(
        contract,
        createRandomZombie({
          name: zombieName,
          userAccount: address,
        }),
      )
      await getZombies()
      console.log('novo zumbi criado!')
    } catch (e) {
      console.log('catch!', e)
      setError(e instanceof Error ? e.message : 'Unknown error')
    }
  }

  const handleClose = () => {
    setError('')
  }

  if (zombies.length > 0) {
    return <Navigate to='/army' />
  }

  return (
    <Center mx='auto' height='100vh'>
      <Flex direction='column'>
        <Center mb='8'>
          <Heading>Create Zombie</Heading>
        </Center>

        <ErrorMessage show={!!error} message={error} onClose={handleClose} />

        <form onSubmit={handleSubmit}>
          <Flex direction='column'>
            <FormLabel htmlFor='zombieName'>Zombie name:</FormLabel>
            <Flex direction='row'>
              <Input type='text' id='zombieName' width='lg' size='lg' mr='2' />
              <Button type='submit' size='lg'>Criar zumbi</Button>
            </Flex>
          </Flex>
        </form>
      </Flex>
    </Center>
  )
}
