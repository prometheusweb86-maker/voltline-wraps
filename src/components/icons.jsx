const p = {
  drop: 'M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z',
  shield: 'M12 3 4.5 6v5.5c0 4.5 3.2 8 7.5 9.5 4.3-1.5 7.5-5 7.5-9.5V6z M9 12l2 2 4-4',
  bolt: 'M13 2 4 14h6l-1 8 9-12h-6z',
  sun: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M12 2v2 M12 20v2 M2 12h2 M20 12h2 M5 5l1.5 1.5 M17.5 17.5 19 19 M5 19l1.5-1.5 M17.5 6.5 19 5',
  truck: 'M2 6h11v10H2z M13 10h4l3 3v3h-7z M6 19a1.5 1.5 0 1 0 0-.01 M17 19a1.5 1.5 0 1 0 0-.01',
  spark: 'M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z',
}

export default function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={p[name]} />
    </svg>
  )
}
