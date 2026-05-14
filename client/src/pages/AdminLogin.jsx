import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Navigate, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { api, getErrorMessage } from '../utils/api'
import { useAuth } from '../hooks/AuthContext'
import { CLINIC } from '../utils/constants'

export default function AdminLogin() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />
  }

  async function onSubmit(event) {
    event.preventDefault()
    setBusy(true)
    try {
      const { data } = await api.post('admin/login', { email, password })
      login(data.data.token)
      toast.success('Welcome back')
      navigate('/admin/dashboard')
    } catch (error) {
      toast.error(getErrorMessage(error, 'Login failed'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Admin Login | {CLINIC.shortName}</title>
      </Helmet>

      <div className="flex min-h-screen items-center justify-center bg-surface-soft px-4 py-10">
        <form
          onSubmit={onSubmit}
          className="w-full max-w-md rounded-[32px] border border-primary/10 bg-white p-8 shadow-teal-lg"
        >
          <p className="text-center font-display text-4xl text-primary">dFine</p>
          <h1 className="mt-2 text-center font-heading text-2xl font-bold text-ink-primary">
            Admin Portal
          </h1>
          <p className="mt-2 text-center text-sm text-ink-secondary">
            Sign in to manage bookings, reviews, gallery content, and clinic information.
          </p>

          <label className="mt-6 block text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Email
          </label>
          <input
            className="mt-1 w-full rounded-2xl border border-primary/15 px-4 py-3"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Password
          </label>
          <input
            type="password"
            className="mt-1 w-full rounded-2xl border border-primary/15 px-4 py-3"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button
            type="submit"
            disabled={busy}
            className="mt-6 w-full rounded-full bg-accent py-3 font-bold text-white transition hover:bg-accent-hover disabled:opacity-60"
          >
            {busy ? 'Signing in...' : 'Login'}
          </button>

          <p className="mt-4 text-center text-xs text-ink-muted">
            Use the seeded admin credentials from the backend environment.
          </p>
        </form>
      </div>
    </>
  )
}
