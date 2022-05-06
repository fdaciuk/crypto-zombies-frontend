import * as S from './zombie-styles'

type ZombieProps = {
  dna: string
}

const HEAD_VARIATIONS = 7
const EYES_VARIATIONS = 11
const SHIRT_VARIATIONS = 6

export const Zombie = ({ dna }: ZombieProps) => {
  const zombieDna = dna.padStart(16, '0')
  const catMode = zombieDna.endsWith('99')

  const head = Number(zombieDna.substring(0, 2)) % HEAD_VARIATIONS + 1
  const eye = Number(zombieDna.substring(2, 4)) % EYES_VARIATIONS + 1
  const shirt = Number(zombieDna.substring(4, 6)) % SHIRT_VARIATIONS + 1
  const skinColor = getHueColor(zombieDna.substring(6, 8))
  const eyeColor = getHueColor(zombieDna.substring(8, 10))
  const clothesColor = getHueColor(zombieDna.substring(10, 12))

  function getHueColor (value: string) {
    return parseInt(`${Number(value) / 100 * 360}`, 10)
  }

  return (
    <S.ExternalContainer>
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
    </S.ExternalContainer>
  )
}
