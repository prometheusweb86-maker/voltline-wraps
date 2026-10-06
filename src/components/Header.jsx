import { useEffect, useState } from 'react'
import { site, waLink } from '../config'
import { scrollToId } from '../lib/scroll'

const links = [
  ['#services', 'Services'],
  ['#process', 'Process'],
  ['#gallery', 'Gallery'],
  ['#contact', 'Contact'],
]

export function Logo() {
  return (
    <span className="logo">
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M13 2 4 14h6l-1 8 9-12h-6z" fill="currentColor" /></svg>
      <span>VOLTLINE<em>WRAPS</em></span>
    </span>
  )
}

export default function Header() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 30)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const go = (e, id) => { e.preventDefault(); setOpen(false); scrollToId(id) }
  return (
    <header className={`header ${solid || open ? 'header-solid' : ''}`}>
      <div className="wrap header-in">
        <a href="#top" aria-label={`${site.name} home`} onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0 }) }}><Logo /></a>
        <nav className={`nav ${open ? 'nav-open' : ''}`} aria-label="Main">
          {links.map(([id, t]) => <a key={id} href={id} onClick={(e) => go(e, id)}>{t}</a>)}
          <a className="btn btn-primary btn-sm nav-cta" href={waLink(`Hi ${site.name}!`)} target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
        </nav>
        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}><i /><i /><i /></button>
      </div>
    </header>
  )
}
