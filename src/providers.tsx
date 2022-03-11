import { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/resources'
import { ChakraProvider } from '@chakra-ui/react'

type Props = {
  children: ReactNode | ReactNode[]
}

type Provider = {
  provider: (props: any) => JSX.Element | null
  props?: unknown
}

const providers: Provider[] = [
  { provider: BrowserRouter },
  {
    provider: ChakraProvider,
    props: { resetCSS: true },
  },
  { provider: AuthProvider },
]

export const Providers = ({ children }: Props) => {
  return (
    <>
      {providers.reduceRight((child, component) => {
        return (
          <component.provider {...component.props}>
            {child}
          </component.provider>
        )
      }, children)}
    </>
  )
}
