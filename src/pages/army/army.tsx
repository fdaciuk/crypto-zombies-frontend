import { Link } from 'react-router-dom'
import { Button, Box, Flex, Heading } from '@chakra-ui/react'
import { Zombie } from '@/ui'
import { useAuth } from '@/resources'

export function Army () {
  const { zombies } = useAuth()

  return (
    <>
      <Heading>Army</Heading>

      <Flex flexWrap='wrap'>
        {zombies.map(data => (
          <Box key={data.id}>
            <Zombie dna={data.dna} />

            <Button as={Link} to={`/eat/${data.id}`}>Comer</Button>
            <Button as={Link} to={`/battle/${data.id}`}>Lutar</Button>
            <Button as={Link} to={data.id}>Detalhes</Button>
          </Box>
        ))}
      </Flex>
    </>
  )
}
