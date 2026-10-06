import { useEffect } from 'react'
import { useRevealEffect } from './scroll'

export default function useReveal(ref) {
  useEffect(() => useRevealEffect(ref.current), [ref])
}
