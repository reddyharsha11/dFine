import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-6xl text-primary">404</p>
      <h1 className="mt-4 font-heading text-2xl font-bold text-ink-primary">Page not found</h1>
      <Link to="/" className="mt-6 rounded-full bg-accent px-6 py-3 font-semibold text-white">
        Back home
      </Link>
    </div>
  )
}
