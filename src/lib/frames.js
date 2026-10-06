export const FRAME_COUNT = 200
const pad = (i) => String(i + 1).padStart(3, '0')
export const webpUrl = (i) => `/frames-webp/ezgif-frame-${pad(i)}.webp?v=2`
export const jpgUrl = (i) => `/frames/ezgif-frame-${pad(i)}.jpg?v=2`

export function loadFrame(i) {
  return new Promise((resolve) => {
    const img = new Image()
    img.decoding = 'async'
    const done = () => (img.decode ? img.decode().catch(() => {}).then(() => resolve(img)) : resolve(img))
    img.onload = done
    img.onerror = () => {
      img.onerror = () => resolve(null)
      img.src = jpgUrl(i)
    }
    img.src = webpUrl(i)
  })
}
