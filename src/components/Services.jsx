import { useRef } from 'react'
import { services } from '../config'
import Icon from './icons'
import useReveal from '../lib/useReveal'

export default function Services() {
  const ref = useRef(null)
  useReveal(ref)
  return (
    <section id="services" className="section" ref={ref}>
      <div className="wrap">
        <p className="eyebrow" data-reveal>What we do</p>
        <h2 className="section-title" data-reveal>Services built around your vehicle</h2>
        <div className="grid-3">
          {services.map((s, i) => (
            <article key={s.id} className="card" data-reveal data-delay={(i % 3) * 0.08}>
              <div className="card-icon"><Icon name={s.icon} /></div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
