import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Center,
  Flex,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react'
import { createRandomZombie, useAuth, useContract } from '@/resources'
import { ErrorMessage } from '@/shared'

type FormEventType = FormEvent<HTMLFormElement> & {
  currentTarget: {
    zombieName: HTMLInputElement
  }
}

export function CreateZombie () {
  const { address } = useAuth()
  const contract = useContract()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  useEffect(() => {

  }, [])

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
      const result = await createRandomZombie({
        name: zombieName,
        userAccount: address,
      })(contract)
      // ouvir o evento NewZombie e, quando esse evento for disparado,
      // setar chamar novamente a função getZombiesByOwner
      console.log('result:', result)
    } catch (e) {
      console.log('catch!', e)
      setError(e instanceof Error ? e.message : 'Unknown error')
    }
  }

  const handleClose = () => {
    setError('')
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
