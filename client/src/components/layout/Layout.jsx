import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { WhatsAppFAB } from './WhatsAppFAB'

export function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    let raf = 0
    function tick(t) {
      lenis.raf(t)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-screen bg-surface-soft">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFAB />
    </div>
  )
}
