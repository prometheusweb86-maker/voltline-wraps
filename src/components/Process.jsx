import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { steps, stats } from '../config'
import useReveal from '../lib/useReveal'
import { reducedMotion } from '../lib/scroll'

function Counter({ value, suffix }) {
  const el = useRef(null)
  useEffect(() => {
    const node = el.current
    const fmt = (n) => Math.round(n).toLocaleString('en-ZA') + suffix
    if (reducedMotion()) { node.textContent = fmt(value); return }
    const o = { v: 0 }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      gsap.to(o, { v: value, duration: 1.6, ease: 'power2.out', onUpdate: () => { node.textContent = fmt(o.v) } })
    }, { threshold: 0.6 })
    io.observe(node)
    return () => io.disconnect()
  }, [value, suffix])
  return <span ref={el}>0{suffix}</span>
}

export default function Process() {
  const ref = useRef(null)
  useReveal(ref)
  return (
    <section id="process" className="section section-alt" ref={ref}>
      <div className="wrap">
        <p className="eyebrow" data-reveal>Why Voltline</p>
        <h2 className="section-title" data-reveal>A simple process. A flawless finish.</h2>
        <ol className="steps">
          {steps.map((s, i) => (
            <li key={s.n} className="step" data-reveal data-delay={i * 0.08}>
              <span className="step-n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="stats">
          {stats.map((s) => (
            <div key={s.label} className="stat" data-reveal>
              <strong><Counter value={s.value} suffix={s.suffix} /></strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
