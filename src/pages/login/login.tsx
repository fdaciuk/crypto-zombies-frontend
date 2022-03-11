import { useState, FormEvent } from 'react'
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

  return (
    <>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor='login'>Endereço da carteira:</label><br />
        <input type='text' name='login' id='login' defaultValue='0x9f61faf7774A04Cb0339A6951F6c5c2D8bb0d595' />
        <button type='submit'>Entrar</button>
      </form>
    </>
  )
}
