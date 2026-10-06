import { useEffect, useRef, useState } from 'react'
import { gallery } from '../config'
import useReveal from '../lib/useReveal'

const pad = (n) => String(n).padStart(3, '0')
const webp = (n) => `/frames-webp/ezgif-frame-${pad(n)}.webp`
const jpg = (n) => `/frames/ezgif-frame-${pad(n)}.jpg`

function Pic({ n, alt, ...rest }) {
  return (
    <picture>
      <source srcSet={webp(n)} type="image/webp" />
      <img src={jpg(n)} alt={alt} width="1280" height="720" {...rest} />
    </picture>
  )
}

export default function Gallery() {
  const ref = useRef(null)
  const [open, setOpen] = useState(null)
  useReveal(ref)
  useEffect(() => {
    if (open === null) return
    const key = (e) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') setOpen((o) => (o + 1) % gallery.length)
      if (e.key === 'ArrowLeft') setOpen((o) => (o - 1 + gallery.length) % gallery.length)
    }
    window.addEventListener('keydown', key)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', key); document.body.style.overflow = '' }
  }, [open])
  return (
    <section id="gallery" className="section" ref={ref}>
      <div className="wrap">
        <p className="eyebrow" data-reveal>The work</p>
        <h2 className="section-title" data-reveal>Inside a full-wrap build</h2>
        <div className="gallery">
          {gallery.map((g, i) => (
            <button key={g.frame} className="g-item" data-reveal data-delay={(i % 3) * 0.08} onClick={() => setOpen(i)} aria-label={`Open: ${g.label}`}>
              <Pic n={g.frame} alt={g.label} loading="lazy" />
              <span>{g.label}</span>
            </button>
          ))}
        </div>
      </div>
      {open !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={gallery[open].label} onClick={() => setOpen(null)}>
          <button className="lb-close" aria-label="Close" onClick={() => setOpen(null)}>×</button>
          <button className="lb-nav lb-prev" aria-label="Previous" onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + gallery.length) % gallery.length) }}>‹</button>
          <figure onClick={(e) => e.stopPropagation()}>
            <Pic n={gallery[open].frame} alt={gallery[open].label} />
            <figcaption>{gallery[open].label}</figcaption>
          </figure>
          <button className="lb-nav lb-next" aria-label="Next" onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % gallery.length) }}>›</button>
        </div>
      )}
    </section>
  )
}
