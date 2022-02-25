import { FormEvent } from 'react'
import { useAuth } from '@/resources'

type OnSubmitEvent = FormEvent<HTMLFormElement> & {
  currentTarget: {
    login: HTMLInputElement
  }
}

export function Login () {
  const { setAddress } = useAuth()

  const handleSubmit = (e: OnSubmitEvent) => {
    e.preventDefault()
    setAddress(e.currentTarget.login.value)
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='login'>Endereço da carteira:</label><br />
        <input type='text' name='login' id='login' />
        <button type='submit'>Entrar</button>
      </form>
    </>
  )
}
