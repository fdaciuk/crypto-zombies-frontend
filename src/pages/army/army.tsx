import { Zombie } from '@/ui'
import { useAuth } from '@/resources'

export function Army () {
  const { zombies } = useAuth()

  return (
    <>
      <h1>Army</h1>

      <ul>
        {zombies.map(data => (
          <Zombie key={data.id} data={data} />
        ))}
      </ul>
    </>
  )
}
