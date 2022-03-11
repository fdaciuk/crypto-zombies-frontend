import { ZombieWithId } from '@/resources'
import styled from 'styled-components'

type ZombieProps = {
  data: ZombieWithId
}

export const Zombie = ({ data }: ZombieProps) => {
  const dna = data.dna.padStart(16, '0')
  const zombieDetails = {
    head: Number(dna.substring(0, 2)) % 7 + 1,
    eye: Number(dna.substring(2, 4)) % 11 + 1,
    mouth: 1,
    leftForearm: 1,
    rightForearm: 1,
    shirt: Number(dna.substring(4, 6)) % 6 + 1,
    skinColor: parseInt(`${Number(dna.substring(6, 8)) / 100 * 360}`, 10),
    eyeColor: parseInt(`${Number(dna.substring(8, 10)) / 100 * 360}`, 10),
    clothesColor: parseInt(`${Number(dna.substring(10, 12)) / 100 * 360}`, 10),
  }

  return (
    <>
      <h2>Zombie details</h2>
      <div style={{ position: 'relative' }}>
        <Head src={`/zombieparts/head-${zombieDetails.head}@2x.png`} />
        <Eyes src={`/zombieparts/eyes-${zombieDetails.eye}@2x.png`} />
        <Mouth src={`/zombieparts/mouth-${zombieDetails.mouth}@2x.png`} />
        <Shirt src={`/zombieparts/shirt-${zombieDetails.shirt}@2x.png`} />
        <LeftForearm src={`/zombieparts/shirt-${zombieDetails.leftForearm}@2x.png`} />
        <RightForearm src={`/zombieparts/shirt-${zombieDetails.rightForearm}@2x.png`} />
      </div>
    </>
  )
}

const Head = styled.img`
  left: 0;
  position: absolute;
  top: 0;
  width: 100px;
`

const Eyes = styled.img`
  left: 33px;
  position: absolute;
  top: 39px;
  width: 48px;
`

const Mouth = styled.img`
  left: 47px;
  position: absolute;
  top: 66px;
  width: 23px;
`

const Shirt = styled.img`
  left: 6px;
  position: absolute;
  top: 55px;
  width: 70px;
  z-index: -1;
`
const LeftForearm = styled.img`
  left: 6px;
  position: absolute;
  top: 55px;
  width: 70px;
`
const RightForearm = styled.img`
  left: 6px;
  position: absolute;
  top: 55px;
  width: 70px;
`
