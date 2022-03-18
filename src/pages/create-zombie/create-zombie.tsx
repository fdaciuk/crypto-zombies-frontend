import { FormEvent } from 'react'
import { createRandomZombie, useAuth, useContract } from '@/resources'

type FormEventType = FormEvent<HTMLFormElement> & {
  currentTarget: {
    zombieName: HTMLInputElement
  }
}

export function CreateZombie () {
  const { address } = useAuth()
  const contract = useContract()

  const handleSubmit = async (e: FormEventType) => {
    e.preventDefault()

    if (!contract) {
      return
    }

    const zombieName = e.currentTarget.zombieName.value
    const result = await createRandomZombie({
      name: zombieName,
      userAccount: address,
    })(contract)

    console.log(result)
  }

  return (
    <>
      <h1>Create Zombie</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='zombieName'>Nome do zumbi:</label>
        <input type='text' id='zombieName' />
        <button type='submit'>Criar zumbi</button>
      </form>
    </>
  )
}
