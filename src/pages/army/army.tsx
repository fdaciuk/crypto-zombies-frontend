import { Button, Box } from '@chakra-ui/react'
import { Zombie } from '@/ui'
import { useAuth } from '@/resources'

export function Army () {
  const { zombies } = useAuth()

  return (
    <>
      <h1>Army</h1>

      <ul>
        {zombies.map(data => (
          <Box key={data.id}>
            <Zombie data={data} />

            <Button>Comer</Button>
            <Button>Lutar</Button>
            <Button>Detalhes</Button>
          </Box>
        ))}
      </ul>
    </>
  )
}
