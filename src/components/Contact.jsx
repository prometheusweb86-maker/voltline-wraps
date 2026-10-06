import { useRef, useState } from 'react'
import { site, waLink, services } from '../config'
import useReveal from '../lib/useReveal'

export default function Contact() {
  const ref = useRef(null)
  const [f, setF] = useState({ name: '', phone: '', vehicle: '', service: services[0].title, message: '' })
  useReveal(ref)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    const text = [
      `Hi ${site.name}, I'd like a quote.`,
      `Name: ${f.name}`,
      `Phone: ${f.phone}`,
      `Vehicle: ${f.vehicle}`,
      `Service: ${f.service}`,
      f.message && `Message: ${f.message}`,
    ].filter(Boolean).join('\n')
    window.open(waLink(text), '_blank', 'noopener')
  }
  const { lat, lon } = site.map
  const bbox = `${lon - 0.03},${lat - 0.025},${lon + 0.03},${lat + 0.025}`
  return (
    <section id="contact" className="section section-alt" ref={ref}>
      <div className="wrap">
        <p className="eyebrow" data-reveal>Get in touch</p>
        <h2 className="section-title" data-reveal>Book your transformation</h2>
        <div className="contact-grid">
          <form className="form" onSubmit={submit} data-reveal>
            <label>Name<input required value={f.name} onChange={set('name')} autoComplete="name" /></label>
            <label>Phone<input required type="tel" value={f.phone} onChange={set('phone')} autoComplete="tel" /></label>
            <label>Vehicle make &amp; model<input required value={f.vehicle} onChange={set('vehicle')} placeholder="e.g. BMW M4 2019" /></label>
            <label>Service
              <select value={f.service} onChange={set('service')}>
                {services.map((s) => <option key={s.id}>{s.title}</option>)}
              </select>
            </label>
            <label>Message<textarea rows="4" value={f.message} onChange={set('message')} /></label>
            <button className="btn btn-primary" type="submit">Send via WhatsApp</button>
            <p className="form-note">This opens WhatsApp with your details pre-filled. Nothing is stored.</p>
          </form>
          <div className="info" data-reveal data-delay="0.1">
            <ul>
              <li><span>Phone</span><a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a></li>
              <li><span>Email</span><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><span>Address</span>{site.address}</li>
              <li><span>Areas</span>{site.areas}</li>
              <li><span>Hours</span>{site.hours}</li>
            </ul>
            <div className="socials">{site.socials.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>)}</div>
            <iframe title="Map" loading="lazy" className="map" src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`} />
          </div>
        </div>
      </div>
    </section>
  )
}
