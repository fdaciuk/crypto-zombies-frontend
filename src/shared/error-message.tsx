import { useState, useEffect } from 'react'
import { ErrorMessage as ErrorMessageUI } from '@/ui/error-message'

type ErrorProps = {
  message: string
  show: boolean
  onClose: () => void
}

export const ErrorMessage = ({ message, show, onClose }: ErrorProps) => {
  const [shouldShow, setShouldShow] = useState(show)

  useEffect(() => {
    const FIVE_SECONDS = 5_000
    const timer = setTimeout(() => {
      setShouldShow(false)
      onClose()
    }, FIVE_SECONDS)

    return () => clearTimeout(timer)
  }, [shouldShow, onClose])

  useEffect(() => {
    setShouldShow(show)
  }, [show])

  if (!shouldShow) return null

  return (
    <ErrorMessageUI message={message} onClose={onClose} />
  )
}
