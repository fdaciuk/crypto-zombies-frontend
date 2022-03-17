import styled from 'styled-components'

type ImgProps = { 'data-img': number }
type ColorProps = { 'data-color': number }

export const ZombieContainer = styled.div`
  position: relative;
`

const MainImg = styled.img`
  user-select: none;
  -webkit-user-drag: none;
`

export const Head = styled(MainImg).attrs<ImgProps>(props => ({
  src: `/zombieparts/head-${props['data-img']}@2x.png`,
  alt: 'Cabeça do zumbi',
}))<ColorProps>`
  filter: hue-rotate(${props => props['data-color']}deg);
  width: 28vh;
  position: absolute;
  left: 13vh;
  top: -4vh;
`

export const Eyes = styled(MainImg).attrs<ImgProps>(props => ({
  src: `/zombieparts/eyes-${props['data-img']}@2x.png`,
  alt: 'Olho do zumbi',
}))<ColorProps>`
  filter: hue-rotate(${props => props['data-color']}deg);
  width: 13vh;
  position: absolute;
  left: 23vh;
  top: 8vh;
`

export const Shirt = styled(MainImg).attrs<ImgProps>(props => ({
  src: `/zombieparts/shirt-${props['data-img']}@2x.png`,
  alt: 'Camiseta do zumbi',
}))<ColorProps>`
  filter: hue-rotate(${props => props['data-color']}deg);
  width: 13vh;
  position: absolute;
  left: 15.6vh;
  top: 13vh;
`

export const Mouth = styled(MainImg).attrs(() => ({
  src: '/zombieparts/mouth-1@2x.png',
  alt: 'Boca do zumbi',
}))`
  width: 6vh;
  position: absolute;
  left: 26.6vh;
  top: 15vh;
`

export const Torso = styled(MainImg).attrs(() => ({
  src: '/zombieparts/torso-1@2x.png',
  alt: 'Torso do zumbi',
}))<ColorProps>`
  filter: hue-rotate(${props => props['data-color']}deg);
  width: 13vh;
  position: absolute;
  left: 15.6vh;
  top: 13vh;
`

export const LeftThigh = styled(MainImg).attrs(() => ({
  src: '/zombieparts/left-thigh-1@2x.png',
  alt: 'Coxa esquerda do zumbi',
}))<ColorProps>`
  filter: hue-rotate(${props => props['data-color']}deg);
  width: 6vh;
  position: absolute;
  left: 17.3vh;
  top: 22vh;
`
export const RightThigh = styled(MainImg).attrs(() => ({
  src: '/zombieparts/right-thigh-1@2x.png',
  alt: 'Coxa direita do zumbi',
}))<ColorProps>`
  filter: hue-rotate(${props => props['data-color']}deg);
  width: 6vh;
  position: absolute;
  left: 20.4vh;
  top: 22vh;
`

export const CatLegs = styled(MainImg).attrs(() => ({
  src: '/zombieparts/catlegs.png',
  alt: 'Pernas de gato do zumbi',
}))<ColorProps>`
  filter: hue-rotate(${props => props['data-color']}deg);
  width: 10vh;
  position: absolute;
  left: 15.4vh;
  top: 18vh;
`

export const LeftHand = styled(MainImg).attrs(() => ({
  src: '/zombieparts/hand1-1@2x.png',
  alt: 'Mão esquerda do zumbi',
}))<ColorProps>`
  filter: hue-rotate(${props => props['data-color']}deg);
  width: 4vh;
  position: absolute;
  left: 24.3vh;
  top: 19vh;
`

export const RightHand = styled(MainImg).attrs(() => ({
  src: '/zombieparts/hand-2-1@2x.png',
  alt: 'Mão direita do zumbi',
}))<ColorProps>`
  filter: hue-rotate(${props => props['data-color']}deg);
  width: 4vh;
  position: absolute;
  left: 28.4vh;
  top: 19vh;
`

export const LeftForearm = styled(MainImg).attrs(() => ({
  src: '/zombieparts/left-forearm-1@2x.png',
  alt: 'Antebraço esquerdo do zumbi',
}))<ColorProps>`
  filter: hue-rotate(${props => props['data-color']}deg);
  width: 4vh;
  position: absolute;
  left: 22.3vh;
  top: 20vh;
`
export const RightForearm = styled(MainImg).attrs(() => ({
  src: '/zombieparts/right-forearm-1@2x.png',
  alt: 'Antebraço direito do zumbi',
}))<ColorProps>`
  filter: hue-rotate(${props => props['data-color']}deg);
  width: 4vh;
  position: absolute;
  left: 26.4vh;
  top: 20vh;
`

export const LeftUpperArm = styled(MainImg).attrs(() => ({
  src: '/zombieparts/left-upper-arm-1@2x.png',
  alt: 'Ombro esquerdo do zumbi',
}))<ColorProps>`
  filter: hue-rotate(${props => props['data-color']}deg);
  width: 6vh;
  position: absolute;
  left: 19.3vh;
  top: 16vh;
`

export const RightUpperArm = styled(MainImg).attrs(() => ({
  src: '/zombieparts/right-upper-arm-1@2x.png',
  alt: 'Ombro direito do zumbi',
}))<ColorProps>`
  filter: hue-rotate(${props => props['data-color']}deg);
  width: 6vh;
  position: absolute;
  left: 23.4vh;
  top: 16vh;
`

export const LeftLeg = styled(MainImg).attrs(() => ({
  src: '/zombieparts/left-leg-1@2x.png',
  alt: 'Perna esquerda do zumbi',
}))<ColorProps>`
  filter: hue-rotate(${props => props['data-color']}deg);
  width: 4vh;
  position: absolute;
  left: 18.3vh;
  top: 27vh;
`

export const RightLeg = styled(MainImg).attrs(() => ({
  src: '/zombieparts/right-leg-1@2x.png',
  alt: 'Perna direita do zumbi',
}))<ColorProps>`
  filter: hue-rotate(${props => props['data-color']}deg);
  width: 3.3vh;
  position: absolute;
  left: 22.3vh;
  top: 27.6vh;
`

export const LeftFeet = styled(MainImg).attrs(() => ({
  src: '/zombieparts/left-feet-1@2x.png',
  alt: 'Pé esquerdo do zumbi',
}))<ColorProps>`
  filter: hue-rotate(${props => props['data-color']}deg);
  width: 4vh;
  position: absolute;
  left: 18.3vh;
  top: 30vh;
`

export const RightFeet = styled(MainImg).attrs(() => ({
  src: '/zombieparts/right-feet-1@2x.png',
  alt: 'Pé direito do zumbi',
}))<ColorProps>`
  filter: hue-rotate(${props => props['data-color']}deg);
  width: 3.3vh;
  position: absolute;
  left: 22.3vh;
  top: 30.3vh;
`
