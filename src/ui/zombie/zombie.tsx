import { ZombieWithId } from '@/resources'
import * as S from './zombie-styles'

type ZombieProps = {
  data: ZombieWithId
}

export const Zombie = ({ data }: ZombieProps) => {
  const dna = data.dna.padStart(16, '0')
  const catMode = dna.endsWith('99')
  const head = Number(dna.substring(0, 2)) % 7 + 1
  const eye = Number(dna.substring(2, 4)) % 11 + 1
  const shirt = Number(dna.substring(4, 6)) % 6 + 1
  const skinColor = getHueColor(dna.substring(6, 8))
  const eyeColor = getHueColor(dna.substring(8, 10))
  const clothesColor = getHueColor(dna.substring(10, 12))

  function getHueColor (value: string) {
    return parseInt(`${Number(value) / 100 * 360}`, 10)
  }

  return (
    <>
      <h2>Zombie details</h2>

      <S.ZombieContainer>
        {!catMode && (
          <>
            <S.LeftFeet data-color={clothesColor} />
            <S.RightFeet data-color={clothesColor} />

            <S.LeftLeg data-color={clothesColor} />
            <S.RightLeg data-color={clothesColor} />

            <S.LeftThigh data-color={clothesColor} />
            <S.RightThigh data-color={clothesColor} />
          </>
        )}

        <S.RightUpperArm data-color={skinColor} />
        <S.Torso data-color={clothesColor} />

        {catMode && <S.CatLegs data-color={clothesColor} />}

        <S.Shirt data-img={shirt} data-color={clothesColor} />
        <S.LeftUpperArm data-color={skinColor} />

        <S.LeftForearm data-color={skinColor} />
        <S.RightForearm data-color={skinColor} />

        <S.LeftHand data-color={skinColor} />
        <S.RightHand data-color={skinColor} />

        <S.Head data-img={head} data-color={skinColor} />
        <S.Eyes data-img={eye} data-color={eyeColor} />
        <S.Mouth />
      </S.ZombieContainer>
    </>
  )
}
