import { createElement } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { Box, Flex, Heading } from '@chakra-ui/react'
import { Zombie } from '@/ui'
import { useAuth } from '@/resources'

const keys = {
  dna: 'DNA',
  id: 'ID',
  level: 'Level',
  lossCount: 'Loss count',
  name: 'Name',
  readyTime: 'Ready time',
  winCount: 'Win count',
}

export function ZombieDetails () {
  const { zombies } = useAuth()
  const { id } = useParams()
  const zombieData = zombies.find(zombie => zombie.id === id)

  if (typeof zombieData === 'undefined') {
    return <Navigate to='/army' />
  }

  return (
    <>
      <Heading>Zombie Details</Heading>

      <Flex flexWrap='wrap'>
        <Box>
          <Zombie dna={zombieData.dna} />
          <ul>
            {Object.entries(zombieData)
              .filter(([key]) => key in keys)
              .map(([key, value]) => {
                if (!isValidKey(key)) return null

                return (
                  <li key={key}>{keys[key]}: {value}</li>
                )
              })}
          </ul>
        </Box>
      </Flex>
    </>
  )
}

function isValidKey (key: string): key is keyof typeof keys {
  return key in keys
}
