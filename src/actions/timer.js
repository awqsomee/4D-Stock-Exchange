import { useEffect, useRef } from 'react'

export function useTimeout(callback, delay) {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (delay === null) return

    const timerId = setTimeout(() => savedCallback.current(), delay)
    return () => clearTimeout(timerId)
  }, [delay])
}
