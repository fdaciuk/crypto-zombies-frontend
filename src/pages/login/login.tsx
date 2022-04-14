import { useCallback, useState, FormEvent, ReactNode } from 'react'
import {
  Button,
  Center,
  Flex,
  FormLabel,
  Heading,
  Input,
  theme,
} from '@chakra-ui/react'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { useAuth } from '@/resources'
import { ErrorMessage } from '@/shared'

type OnSubmitEvent = FormEvent<HTMLFormElement> & {
  currentTarget: {
    login: HTMLInputElement
  }
}

export function Login () {
  const { setAddress } = useAuth()
  const [error, setError] = useState('')

  const handleSubmit = async (e: OnSubmitEvent) => {
    e.preventDefault()
    await pipe(
      TE.tryCatch(
        () => setAddress(e.currentTarget.login.value),
        (error) => {
          console.log('login error:', error)
          setError(error instanceof Error ? error.message : 'Unknown error')
        },
      ),
    )()
  }

  const handleClose = useCallback(() => {
    setError('')
  }, [])

  console.log('chakra ui theme:', theme)

  return (
    <Center mx='auto' height='100vh'>
      <Flex direction='column'>
        <Center mb='8'>
          <Heading>Login</Heading>
        </Center>

        <ErrorMessage show={!!error} message={error} onClose={handleClose} />

        <Form onSubmit={handleSubmit}>
          <FormLabel htmlFor='login'>Wallet Address:</FormLabel>
          <Flex direction='row'>
            <InputWallet />
            <Button type='submit' size='lg'>Connect</Button>
          </Flex>
        </Form>
      </Flex>
    </Center>
  )
}

type FormProps = {
  children: ReactNode
  onSubmit: (e: OnSubmitEvent) => void
}

const Form = ({ children, onSubmit }: FormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <Flex direction='column'>
        {children}
      </Flex>
    </form>
  )
}

const InputWallet = () => {
  return (
    <Input
      type='text'
      name='login'
      id='login'
      defaultValue='0x14418c6eff626Cc821d28fc463753fAa512C56C5'
      mr='2'
      size='lg'
      width='lg'
    />
  )
}
