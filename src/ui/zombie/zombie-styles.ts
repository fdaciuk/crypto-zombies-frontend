import styled from 'styled-components/macro'

type ImgProps = { 'data-img': number }
type ColorProps = { 'data-color': number }

const containerHeight = 338
export const ExternalContainer = styled.div`
  overflow: hidden;
  height: ${containerHeight}px;
  width: 280px;
`

export const ZombieContainer = styled.div`
  height: ${containerHeight}px;
  left: -130px;
  position: relative;
  top: 15px;
  width: 410px;
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
  width: 280px;
  position: absolute;
  left: 129px;
  top: -40px;
`

export const Eyes = styled(MainImg).attrs<ImgProps>(props => ({
  src: `/zombieparts/eyes-${props['data-img']}@2x.png`,
  alt: 'Olho do zumbi',
}))<ColorProps>`
  filter: hue-rotate(${props => props['data-color']}deg);
  width: 129px;
  position: absolute;
  left: 229px;
  top: 80px;
`

export const Shirt = styled(MainImg).attrs<ImgProps>(props => ({
  src: `/zombieparts/shirt-${props['data-img']}@2x.png`,
  alt: 'Camiseta do zumbi',
}))<ColorProps>`
  filter: hue-rotate(${props => props['data-color']}deg);
  width: 130px;
  position: absolute;
  left: 155px;
  top: 129px;
`

export const Mouth = styled(MainImg).attrs(() => ({
  src: '/zombieparts/mouth-1@2x.png',
  alt: 'Boca do zumbi',
}))`
  width: 60px;
  position: absolute;
  left: 265px;
  top: 149px;
`

export const Torso = styled(MainImg).attrs(() => ({
  src: '/zombieparts/torso-1@2x.png',
  alt: 'Torso do zumbi',
}))<ColorProps>`
  filter: hue-rotate(${props => props['data-color']}deg);
  width: 130px;
  position: absolute;
  left: 156px;
  top: 129px;
`

export const LeftThigh = styled(MainImg).attrs(() => ({
  src: '/zombieparts/left-thigh-1@2x.png',
  alt: 'Coxa esquerda do zumbi',
}))<ColorProps>`
  filter: hue-rotate(${props => props['data-color']}deg);
  width: 60px;
  position: absolute;
  left: 172px;
  top: 219px;
`
export const RightThigh = styled(MainImg).attrs(() => ({
  src: '/zombieparts/right-thigh-1@2x.png',
  alt: 'Coxa direita do zumbi',
}))<ColorProps>`
  filter: hue-rotate(${props => props['data-color']}deg);
  width: 59px;
  position: absolute;
  left: 203px;
  top: 219px;
`

export const CatLegs = styled(MainImg).attrs(() => ({
  src: '/zombieparts/catlegs.png',
  alt: 'Pernas de gato do zumbi',
}))<ColorProps>`
  filter: hue-rotate(${props => props['data-color']}deg);
  width: 100px;
  position: absolute;
  left: 153px;
  top: 179px;
`

export const LeftHand = styled(MainImg).attrs(() => ({
  src: '/zombieparts/hand1-1@2x.png',
  alt: 'Mão esquerda do zumbi',
}))<ColorProps>`
  filter: hue-rotate(${props => props['data-color']}deg);
  width: 40px;
  position: absolute;
  left: 242px;
  top: 189px;
`

export const RightHand = styled(MainImg).attrs(() => ({
  src: '/zombieparts/hand-2-1@2x.png',
  alt: 'Mão direita do zumbi',
}))<ColorProps>`
  filter: hue-rotate(${props => props['data-color']}deg);
  width: 40px;
  position: absolute;
  left: 283px;
  top: 189px;
`

export const LeftForearm = styled(MainImg).attrs(() => ({
  src: '/zombieparts/left-forearm-1@2x.png',
  alt: 'Antebraço esquerdo do zumbi',
}))<ColorProps>`
  filter: hue-rotate(${props => props['data-color']}deg);
  width: 40px;
  position: absolute;
  left: 222px;
  top: 199px;
`
export const RightForearm = styled(MainImg).attrs(() => ({
  src: '/zombieparts/right-forearm-1@2x.png',
  alt: 'Antebraço direito do zumbi',
}))<ColorProps>`
  filter: hue-rotate(${props => props['data-color']}deg);
  width: 40px;
  position: absolute;
  left: 263px;
  top: 199px;
`

export const LeftUpperArm = styled(MainImg).attrs(() => ({
  src: '/zombieparts/left-upper-arm-1@2x.png',
  alt: 'Ombro esquerdo do zumbi',
}))<ColorProps>`
  filter: hue-rotate(${props => props['data-color']}deg);
  width: 60px;
  position: absolute;
  left: 192px;
  top: 159px;
`

export const RightUpperArm = styled(MainImg).attrs(() => ({
  src: '/zombieparts/right-upper-arm-1@2x.png',
  alt: 'Ombro direito do zumbi',
}))<ColorProps>`
  filter: hue-rotate(${props => props['data-color']}deg);
  width: 60px;
  position: absolute;
  left: 233px;
  top: 159px;
`

export const LeftLeg = styled(MainImg).attrs(() => ({
  src: '/zombieparts/left-leg-1@2x.png',
  alt: 'Perna esquerda do zumbi',
}))<ColorProps>`
  filter: hue-rotate(${props => props['data-color']}deg);
  width: 39px;
  position: absolute;
  left: 182px;
  top: 269px;
`

export const RightLeg = styled(MainImg).attrs(() => ({
  src: '/zombieparts/right-leg-1@2x.png',
  alt: 'Perna direita do zumbi',
}))<ColorProps>`
  filter: hue-rotate(${props => props['data-color']}deg);
  width: 33px;
  position: absolute;
  left: 222px;
  top: 275px;
`

export const LeftFeet = styled(MainImg).attrs(() => ({
  src: '/zombieparts/left-feet-1@2x.png',
  alt: 'Pé esquerdo do zumbi',
}))<ColorProps>`
  filter: hue-rotate(${props => props['data-color']}deg);
  width: 40px;
  position: absolute;
  left: 182px;
  top: 299px;
`

export const RightFeet = styled(MainImg).attrs(() => ({
  src: '/zombieparts/right-feet-1@2x.png',
  alt: 'Pé direito do zumbi',
}))<ColorProps>`
  filter: hue-rotate(${props => props['data-color']}deg);
  width: 33px;
  position: absolute;
  left: 222px;
  top: 302px;
`
