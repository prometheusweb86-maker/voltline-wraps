import { site, waLink } from '../config'

export default function Floating() {
  return (
    <div className="floating">
      <a className="fab fab-call" href={`tel:${site.phone.replace(/\s/g, '')}`} aria-label="Call us">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11 11 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.6 3.6a1 1 0 0 1-.25 1z" /></svg>
      </a>
      <a className="fab fab-wa" href={waLink(`Hi ${site.name}!`)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp us">
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 2a8 8 0 1 1-4.2 14.8l-.3-.2-2.4.6.7-2.3-.2-.3A8 8 0 0 1 12 4zm-3 3.5c-.3 0-.7.2-1 .6-.4.5-.8 1.300-.4 2.600.4 1.200 1.300 2.500 2.600 3.600 1.300 1.100 2.600 1.700 3.700 2 .8.200 1.300.100 1.700-.200.400-.300.800-1 .700-1.400 0-.2-.2-.3-.5-.4l-1.500-.7c-.2-.1-.4-.1-.6.100l-.6.700c-.1.200-.3.200-.5.100-1-.4-1.800-1-2.300-1.900-.1-.2 0-.3.100-.5l.4-.5c.1-.2.1-.3 0-.5l-.6-1.500c-.1-.3-.3-.4-.5-.4z" /></svg>
      </a>
    </div>
  )
}
