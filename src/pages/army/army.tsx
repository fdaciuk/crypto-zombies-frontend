import { Link } from 'react-router-dom'
import { Button, Box, Flex } from '@chakra-ui/react'
import { Zombie } from '@/ui'
import { useAuth } from '@/resources'

export function Army () {
  const { zombies } = useAuth()

  return (
    <>
      <h1>Army</h1>

      <Flex flexWrap='wrap'>
        {zombies.map(data => (
          <Box key={data.id}>
            <Zombie data={data} />

            <Button as={Link} to={`/eat/${data.id}`}>Comer</Button>
            <Button as={Link} to={`/battle/${data.id}`}>Lutar</Button>
            <Button as={Link} to={data.id}>Detalhes</Button>
          </Box>
        ))}
      </Flex>
    </>
  )
}
