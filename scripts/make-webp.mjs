import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
const root = path.resolve(import.meta.dirname, '..', 'public')
const out = path.join(root, 'frames-webp')
fs.mkdirSync(out, { recursive: true })
const files = fs.readdirSync(path.join(root, 'frames')).filter((f) => f.endsWith('.jpg'))
for (const f of files) {
  const dest = path.join(out, f.replace('.jpg', '.webp'))
  if (fs.existsSync(dest)) continue
  await sharp(path.join(root, 'frames', f)).webp({ quality: 75 }).toFile(dest)
}
await sharp(path.join(root, 'frames', 'ezgif-frame-240.jpg')).resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 82 }).toFile(path.join(root, 'og.jpg'))
console.log(`webp: ${files.length} frames`)
