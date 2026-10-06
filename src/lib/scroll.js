import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

let lenis = null
let tick = null

export function startLenis() {
  if (lenis || reducedMotion()) return
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 })
  lenis.on('scroll', ScrollTrigger.update)
  tick = (t) => lenis.raf(t * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
}

export function stopLenis() {
  if (!lenis) return
  gsap.ticker.remove(tick)
  lenis.destroy()
  lenis = null
}

export function scrollToId(id) {
  const el = document.querySelector(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: -64 })
  else el.scrollIntoView({ behavior: 'auto' })
}

export function useRevealEffect(root) {
  if (reducedMotion() || !root) return () => {}
  const els = root.querySelectorAll('[data-reveal]')
  const triggers = []
  els.forEach((el, i) => {
    const d = Number(el.dataset.delay || 0)
    triggers.push(
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        once: true,
        onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.8, delay: d, ease: 'power3.out' }),
      }),
    )
  })
  return () => triggers.forEach((t) => t.kill())
}
