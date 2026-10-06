import { site } from '../config'
import { Logo } from './Header'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div><Logo /><p className="footer-about">{site.tagline}. Wraps, PPF, tints and custom finishes across {site.areas.split(' · ').slice(0, 3).join(', ')} and beyond.</p></div>
          <div><h4>Contact</h4><p>{site.phone}<br />{site.email}<br />{site.address}</p></div>
          <div><h4>Follow</h4><p>{site.socials.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}<br /></a>)}</p></div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Website by <a href="https://www.prometheusdigital.co.za/" target="_blank" rel="noopener noreferrer" className="credit">Prometheus Digital</a></p>
        </div>
      </div>
    </footer>
  )
}
