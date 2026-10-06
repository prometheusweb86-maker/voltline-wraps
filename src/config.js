// DEMO DETAILS — replace with the real client's before going live.
export const site = {
  name: 'Voltline Wraps',
  tagline: 'Transform Every Panel',
  subline: 'Colour-change wraps, paint protection film and chrome deletes — fitted by specialists, finished to factory standard.',
  phone: '+27 82 000 0000',
  whatsapp: '27820000000',
  email: 'hello@voltlinewraps.example',
  address: 'Unit 12, Kyalami Business Park, Midrand, Johannesburg, 1684',
  areas: 'Midrand · Sandton · Centurion · Pretoria · Johannesburg',
  hours: 'Mon–Fri 08:00–17:00 · Sat 08:00–13:00',
  socials: [
    { label: 'Instagram', href: 'https://instagram.com/' },
    { label: 'Facebook', href: 'https://facebook.com/' },
    { label: 'Google Business', href: 'https://g.page/' },
  ],
  url: 'https://voltline-wraps.vercel.app',
  map: { lat: -25.995, lon: 28.06 },
}

export const waLink = (text = '') =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`

export const services = [
  { id: 'colour', title: 'Colour-Change Wraps', text: 'Satin, gloss, matte, metallic and colour-flip finishes in premium cast vinyl. Full or partial wraps with tucked, seamless edges.', icon: 'drop' },
  { id: 'ppf', title: 'Paint Protection Film', text: 'Self-healing clear film that shrugs off stone chips, swirls and UV. Full-front, track-pack or whole-car coverage.', icon: 'shield' },
  { id: 'chrome', title: 'Chrome Delete', text: 'Blackout your window trims, grilles, badges and roof rails in gloss or satin black for a sharper, stealthier look.', icon: 'bolt' },
  { id: 'tint', title: 'Window Tints', text: 'Ceramic and carbon films that cut heat and glare, protect the interior and add privacy — fitted to legal limits.', icon: 'sun' },
  { id: 'commercial', title: 'Commercial Branding', text: 'Fleet livery, partial wraps and printed graphics that turn every vehicle into a moving billboard for your business.', icon: 'truck' },
  { id: 'custom', title: 'Custom Graphics & Accents', text: 'Roof wraps, racing stripes, mirror caps, calipers and bespoke printed designs to make your build one of one.', icon: 'spark' },
]

export const steps = [
  { n: '01', title: 'Consult', text: 'Tell us what you want. We inspect the vehicle, talk finishes and give you a fixed quote.' },
  { n: '02', title: 'Design', text: 'Pick from swatches and see your colour on the panel. Commercial jobs get a proof for approval.' },
  { n: '03', title: 'Install', text: 'Trims and handles come off, surfaces are decontaminated, and film is applied in a dust-controlled bay.' },
  { n: '04', title: 'Aftercare', text: 'You get a care guide, a post-fit check and a written warranty on materials and workmanship.' },
]

export const stats = [
  { value: 9, suffix: '+', label: 'Years wrapping' },
  { value: 1200, suffix: '+', label: 'Vehicles wrapped' },
  { value: 5, suffix: ' yr', label: 'Install warranty' },
]

export const gallery = [
  { frame: 1, label: 'Matte black — before' },
  { frame: 120, label: 'Panels off, film peeling' },
  { frame: 150, label: 'Prep & disassembly' },
  { frame: 195, label: 'Film going on' },
  { frame: 225, label: 'Satin blue taking shape' },
  { frame: 240, label: 'Finished satin blue wrap' },
]
