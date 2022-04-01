import { FormEvent, useState } from 'react'
import {
  Button,
  Center,
  Flex,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react'
import { createRandomZombie, useAuth, useContract } from '@/resources'
import { ErrorMessage } from '@/ui'

type FormEventType = FormEvent<HTMLFormElement> & {
  currentTarget: {
    zombieName: HTMLInputElement
  }
}

export function CreateZombie () {
  const { address } = useAuth()
  const contract = useContract()
  const [error, setError] = useState<string | null>(null)

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
      // redirect para /army
      console.log(result)
      window.location.href = '/'
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error')
    }
  }

  const handleClose = () => {
    setError(null)
  }

  return (
    <Center mx='auto' height='100vh'>
      <Flex direction='column'>
        <Center mb='8'>
          <Heading>Create Zombie</Heading>
        </Center>

        {error && <ErrorMessage message={error} onClose={handleClose} />}

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
