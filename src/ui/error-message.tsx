import {
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from '@chakra-ui/react'

type ErrorProps = {
  message: string
  onClose: () => void
}

export const ErrorMessage = ({ message, onClose }: ErrorProps) => {
  return (
    <Alert status='error' variant='left-accent' mb='2'>
      <AlertIcon />
      <AlertTitle>{message}</AlertTitle>
      <CloseButton position='absolute' right='8px' top='8px' onClick={onClose} />
    </Alert>
  )
}
