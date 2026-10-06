import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { site, waLink } from '../config'
import { FRAME_COUNT, loadFrame, jpgUrl, webpUrl } from '../lib/frames'
import { reducedMotion, scrollToId } from '../lib/scroll'

gsap.registerPlugin(ScrollTrigger)

const KEY_STEP = 4
const FOCAL = { x: 0.65, y: 0.55 }
const IMG_W = 1280
const IMG_H = 720

function drawFrame(ctx, img, cw, ch, dpr) {
  const w = cw * dpr
  const h = ch * dpr
  ctx.clearRect(0, 0, w, h)
  const portrait = cw / ch < 1.05
  let s, x, y
  if (portrait) {
    // fit the car (x 24%–100% of the frame) across the width, park it in the upper part of the screen
    const span = 0.76
    s = w / (IMG_W * span)
    x = -0.24 * IMG_W * s
    y = h * 0.1
  } else {
    // object-fit: cover, anchored on the focal point
    s = Math.max(w / IMG_W, h / IMG_H)
    x = (w - IMG_W * s) * FOCAL.x
    y = (h - IMG_H * s) * FOCAL.y
  }
  ctx.drawImage(img, x, y, IMG_W * s, IMG_H * s)
  // portrait: the frame is shorter than the screen, so feather its top/bottom edges into the page
  const style = ctx.canvas.style
  if (portrait) {
    const top = y / dpr
    const hh = (IMG_H * s) / dpr
    const m = `linear-gradient(to bottom, transparent ${top}px, #000 ${top + hh * 0.22}px, #000 ${top + hh * 0.78}px, transparent ${top + hh}px)`
    style.maskImage = m
    style.webkitMaskImage = m
  } else {
    style.maskImage = ''
    style.webkitMaskImage = ''
  }
}

export default function Hero() {
  const section = useRef(null)
  const stage = useRef(null)
  const canvas = useRef(null)
  const bar = useRef(null)
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)
  const [still] = useState(() => reducedMotion())

  useEffect(() => {
    if (still) {
      setReady(true)
      return
    }
    const cv = canvas.current
    const ctx = cv.getContext('2d')
    const images = new Array(FRAME_COUNT).fill(null)
    const proxy = { p: 0 }
    let dpr = 1
    let cw = 0
    let ch = 0
    let current = -1
    let raf = 0
    let alive = true

    const nearest = (i) => {
      if (images[i]) return images[i]
      for (let d = 1; d < FRAME_COUNT; d++) {
        if (i - d >= 0 && images[i - d]) return images[i - d]
        if (i + d < FRAME_COUNT && images[i + d]) return images[i + d]
      }
      return null
    }
    const render = (force) => {
      const idx = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(proxy.p * (FRAME_COUNT - 1))))
      if (!force && idx === current) return
      const img = nearest(idx)
      if (!img) return
      current = idx
      drawFrame(ctx, img, cw, ch, dpr)
    }
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      cw = stage.current.clientWidth
      ch = stage.current.clientHeight
      cv.width = Math.round(cw * dpr)
      cv.height = Math.round(ch * dpr)
      render(true)
    }
    const loop = () => {
      if (!alive) return
      render(false)
      raf = requestAnimationFrame(loop)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(stage.current)
    window.addEventListener('orientationchange', resize)

    // ---- preloading: first frame, then every 4th, then the rest
    const keys = []
    for (let i = 0; i < FRAME_COUNT; i += KEY_STEP) keys.push(i)
    if (keys[keys.length - 1] !== FRAME_COUNT - 1) keys.push(FRAME_COUNT - 1)
    const rest = []
    for (let i = 0; i < FRAME_COUNT; i++) if (i % KEY_STEP !== 0 && i !== FRAME_COUNT - 1) rest.push(i)
    let keysDone = 0
    const queue = [...keys, ...rest]
    let cursor = 0
    const pump = async () => {
      while (alive && cursor < queue.length) {
        const i = queue[cursor++]
        const img = await loadFrame(i)
        if (!alive) return
        images[i] = img
        if (i === 0) render(true)
        if (keys.includes(i)) {
          keysDone++
          setProgress(Math.round((keysDone / keys.length) * 100))
          if (keysDone === keys.length) setReady(true)
        }
        if (img && Math.abs(i - current) < 2) render(true)
      }
    }
    for (let k = 0; k < 8; k++) pump()
    raf = requestAnimationFrame(loop)

    // ---- scroll timeline
    const ctxG = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section.current, start: 'top top', end: 'bottom bottom', scrub: 0.5 },
        defaults: { ease: 'none' },
      })
      tl.to(proxy, { p: 1, duration: 1 }, 0)
      tl.fromTo(bar.current, { scaleY: 0 }, { scaleY: 1, duration: 1 }, 0)
      const fadeIn = (sel, a, b) => tl.fromTo(sel, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: b - a }, a)
      const fadeOut = (sel, a, b) => tl.to(sel, { autoAlpha: 0, y: -40, duration: b - a }, a)
      fadeOut('.ov-0', 0.1, 0.16)
      fadeIn('.ov-1', 0.24, 0.3)
      fadeOut('.ov-1', 0.4, 0.46)
      fadeIn('.ov-2', 0.5, 0.56)
      fadeOut('.ov-2', 0.65, 0.71)
      fadeIn('.ov-3', 0.8, 0.86)
      tl.to('.hint', { autoAlpha: 0, duration: 0.04 }, 0.02)
    }, section)

    return () => {
      alive = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('orientationchange', resize)
      ctxG.revert()
    }
  }, [still])

  return (
    <section id="top" ref={section} className={`hero ${still ? 'hero-still' : ''}`}>
      <div className="hero-stage" ref={stage}>
        <div className="hero-glow" aria-hidden="true" />
        {still ? (
          <picture>
            <source srcSet={webpUrl(0)} type="image/webp" />
            <img className="hero-canvas" src={jpgUrl(0)} alt="Car in a satin blue wrap" />
          </picture>
        ) : (
          <canvas ref={canvas} className="hero-canvas" role="img" aria-label="Scroll animation: a car is disassembled, wrapped in film and rebuilt in satin blue" />
        )}
        <div className="hero-vignette" aria-hidden="true" />
        <div className="hero-fade" aria-hidden="true" />

        <div className="overlays">
          <div className="ov ov-0" >
            <p className="eyebrow">Vehicle wraps · PPF · Customisation</p>
            <h1>{site.tagline}</h1>
            <p className="lead">{site.subline}</p>
            <div className="cta-row">
              <a className="btn btn-primary" href={waLink(`Hi ${site.name}, I'd like to chat about wrapping my car.`)} target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
              <a className="btn btn-ghost" href="#contact" onClick={(e) => { e.preventDefault(); scrollToId('#contact') }}>Get a Quote</a>
            </div>
          </div>
          {!still && (
            <>
              <div className="ov ov-1">
                <p className="eyebrow">01 · Prep</p>
                <h2>Precision Disassembly</h2>
                <p className="lead">We open her up and remove trims, handles and panels so film tucks around every edge. No cut lines, no lifting corners, no shortcuts.</p>
              </div>
              <div className="ov ov-2">
                <p className="eyebrow">02 · Material</p>
                <h2>Premium Film, Expertly Applied</h2>
                <p className="lead">Colour-change vinyl and self-healing PPF from the leading film brands, laid in a controlled bay by certified installers.</p>
              </div>
              <div className="ov ov-3">
                <p className="eyebrow">03 · Result</p>
                <h2>The Finished Product</h2>
                <p className="lead">Every component cleaned, wrapped and refitted, then handed back looking like it left the factory that way.</p>
                <div className="cta-row">
                  <a className="btn btn-primary" href="#contact" onClick={(e) => { e.preventDefault(); scrollToId('#contact') }}>Book your transformation</a>
                </div>
              </div>
            </>
          )}
                  </div>

        {!still && (
          <>
            <div className="hint" aria-hidden="true"><span>Scroll to explore</span><i /></div>
            <div className="progress-track" aria-hidden="true"><div className="progress-bar" ref={bar} /></div>
          </>
        )}

        <div className={`loader ${ready ? 'loader-hide' : ''}`} aria-live="polite">
          <div className="loader-brand">VOLTLINE</div>
          <div className="loader-line"><i style={{ transform: `scaleX(${progress / 100})` }} /></div>
          <div className="loader-pct">{progress}%</div>
        </div>
      </div>
    </section>
  )
}
