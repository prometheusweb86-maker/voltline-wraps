import { lazy, Suspense, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Floating from './components/Floating'
import { startLenis, stopLenis } from './lib/scroll'

const Services = lazy(() => import('./components/Services'))
const Process = lazy(() => import('./components/Process'))
const Gallery = lazy(() => import('./components/Gallery'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add('js')
    startLenis()
    return stopLenis
  }, [])
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <Services />
          <Process />
          <Gallery />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}><Footer /></Suspense>
      <Floating />
      <div className="grain" aria-hidden="true" />
    </>
  )
}
