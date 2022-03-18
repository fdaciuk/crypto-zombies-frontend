import { useEffect, useState, FormEvent } from 'react'
import {
  Button,
  Center,
  Flex,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { useAuth } from '@/resources'

type OnSubmitEvent = FormEvent<HTMLFormElement> & {
  currentTarget: {
    login: HTMLInputElement
  }
}

export function Login () {
  const { setAddress } = useAuth()
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: OnSubmitEvent) => {
    e.preventDefault()
    pipe(
      E.tryCatch(
        () => setAddress(e.currentTarget.login.value),
        (error) => {
          setError(error instanceof Error ? error.message : 'Unknown error')
        },
      ),
    )
  }

  useEffect(() => {
    const FIVE_SECONDS = 5_000
    const timer = setTimeout(() => {
      setError(null)
    }, FIVE_SECONDS)

    return () => clearTimeout(timer)
  }, [error])

  return (
    <Center w='50%'>
      <Flex flexDirection='column'>
        <Heading as='h1'>Login</Heading>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <Flex>
            <FormLabel htmlFor='login'>Endereço da carteira:</FormLabel>
            <Input type='text' name='login' id='login' defaultValue='0x9f61faf7774A04Cb0339A6951F6c5c2D8bb0d595' />
            <Button type='submit'>Entrar</Button>
          </Flex>
        </form>
      </Flex>
    </Center>
  )
}
