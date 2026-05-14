import { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, Navigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { api, getErrorMessage } from '../utils/api'
import { useAuth } from '../hooks/AuthContext'
import { CLINIC, formatIndianDate } from '../utils/constants'

const tabs = ['Overview', 'Appointments', 'Reviews', 'Gallery', 'Messages', 'Settings']

export default function AdminDashboard() {
  const { isAuthenticated, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('Overview')
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState(null)
  const [appointments, setAppointments] = useState([])
  const [reviews, setReviews] = useState([])
  const [gallery, setGallery] = useState([])
  const [messages, setMessages] = useState([])
  const [appointmentQuery, setAppointmentQuery] = useState('')
  const [settingsDraft, setSettingsDraft] = useState(null)
  const [newReview, setNewReview] = useState({ patientName: '', rating: 5, reviewText: '', source: 'Google' })
  const [newGallery, setNewGallery] = useState({ title: '', imageUrl: '', category: 'clinic', description: '' })

  useEffect(() => {
    if (!isAuthenticated) return
    async function load() {
      setLoading(true)
      try {
        const [statsRes, appointmentsRes, reviewsRes, galleryRes, messagesRes, settingsRes] = await Promise.all([
          api.get('appointments/stats'),
          api.get('appointments'),
          api.get('reviews/all'),
          api.get('gallery/all'),
          api.get('contact'),
          api.get('settings'),
        ])
        setStats(statsRes.data.data)
        setAppointments(appointmentsRes.data.data || [])
        setReviews(reviewsRes.data.data || [])
        setGallery(galleryRes.data.data || [])
        setMessages(messagesRes.data.data || [])
        setSettingsDraft(settingsRes.data.data)
      } catch (error) {
        toast.error(getErrorMessage(error, 'Could not load dashboard'))
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [isAuthenticated])

  const filteredAppointments = useMemo(() => {
    const query = appointmentQuery.trim().toLowerCase()
    if (!query) return appointments
    return appointments.filter((item) =>
      [item.name, item.phone, item.service].some((value) => String(value || '').toLowerCase().includes(query))
    )
  }, [appointmentQuery, appointments])

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  async function setAppointmentStatus(id, status) {
    try {
      await api.put(`appointments/${id}`, { status })
      setAppointments((current) => current.map((item) => (item._id === id ? { ...item, status } : item)))
      toast.success('Appointment updated')
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  async function toggleReview(review) {
    try {
      const { data } = await api.put(`reviews/${review._id}`, { isVisible: !review.isVisible })
      setReviews((current) => current.map((item) => (item._id === review._id ? data.data : item)))
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  async function submitReview(event) {
    event.preventDefault()
    try {
      const { data } = await api.post('reviews', newReview)
      setReviews((current) => [data.data, ...current])
      setNewReview({ patientName: '', rating: 5, reviewText: '', source: 'Google' })
      toast.success('Review added')
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  async function deleteReview(id) {
    try {
      await api.delete(`reviews/${id}`)
      setReviews((current) => current.filter((item) => item._id !== id))
      toast.success('Review deleted')
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  async function submitGallery(event) {
    event.preventDefault()
    try {
      const { data } = await api.post('gallery', newGallery)
      setGallery((current) => [data.data, ...current])
      setNewGallery({ title: '', imageUrl: '', category: 'clinic', description: '' })
      toast.success('Gallery item added')
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  async function deleteGallery(id) {
    try {
      await api.delete(`gallery/${id}`)
      setGallery((current) => current.filter((item) => item._id !== id))
      toast.success('Gallery item removed')
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  async function markMessageRead(message) {
    try {
      const { data } = await api.put(`contact/${message._id}`, { isRead: !message.isRead })
      setMessages((current) => current.map((item) => (item._id === message._id ? data.data : item)))
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  async function deleteMessage(id) {
    try {
      await api.delete(`contact/${id}`)
      setMessages((current) => current.filter((item) => item._id !== id))
      toast.success('Message deleted')
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  async function saveSettings(event) {
    event.preventDefault()
    try {
      const { data } = await api.put('settings', settingsDraft)
      setSettingsDraft(data.data)
      toast.success('Settings saved')
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | {CLINIC.shortName}</title>
      </Helmet>

      <div className="min-h-screen bg-surface-soft">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[240px_1fr]">
          <aside className="rounded-[32px] bg-surface-dark p-6 text-white shadow-teal-lg">
            <p className="font-display text-4xl text-primary-light">dFine</p>
            <p className="mt-2 text-sm text-white/65">Clinic control room</p>
            <nav className="mt-8 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`flex w-full items-center rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                    activeTab === tab ? 'bg-primary-pale text-primary' : 'text-white/75 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
            <div className="mt-8 space-y-3">
              <Link to="/" className="block text-sm text-white/70 hover:text-white">
                View live site
              </Link>
              <button type="button" onClick={logout} className="text-sm text-white/70 hover:text-white">
                Logout
              </button>
            </div>
          </aside>

          <main className="space-y-6">
            <header className="rounded-[32px] border border-primary/10 bg-white p-6 shadow-teal-sm">
              <h1 className="font-heading text-2xl font-bold text-ink-primary">{activeTab}</h1>
              <p className="mt-2 text-sm text-ink-secondary">
                Manage bookings, social proof, gallery assets, inbound messages, and clinic display
                details.
              </p>
            </header>

            {loading ? (
              <div className="rounded-[32px] border border-primary/10 bg-white p-8 text-sm text-ink-secondary shadow-teal-sm">
                Loading dashboard...
              </div>
            ) : null}

            {!loading && activeTab === 'Overview' ? (
              <section className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <StatCard label="Pending Confirmation" value={stats?.pending ?? 0} />
                  <StatCard label="Completed This Month" value={stats?.completedThisMonth ?? 0} />
                  <StatCard label="This Month Total" value={stats?.bookingsThisMonth ?? 0} />
                  <StatCard label="Unread Messages" value={messages.filter((item) => !item.isRead).length} />
                </div>
                <Panel title="Recent appointments">
                  <AppointmentsTable rows={appointments.slice(0, 5)} onSetStatus={setAppointmentStatus} />
                </Panel>
              </section>
            ) : null}

            {!loading && activeTab === 'Appointments' ? (
              <Panel title="Appointments manager">
                <input
                  value={appointmentQuery}
                  onChange={(event) => setAppointmentQuery(event.target.value)}
                  placeholder="Search by patient, phone, or service"
                  className="mb-4 w-full rounded-2xl border border-primary/15 px-4 py-3"
                />
                <AppointmentsTable rows={filteredAppointments} onSetStatus={setAppointmentStatus} />
              </Panel>
            ) : null}

            {!loading && activeTab === 'Reviews' ? (
              <section className="space-y-6">
                <Panel title="Add review manually">
                  <form onSubmit={submitReview} className="grid gap-3 md:grid-cols-2">
                    <input
                      className="rounded-2xl border border-primary/15 px-4 py-3"
                      placeholder="Patient name"
                      value={newReview.patientName}
                      onChange={(event) => setNewReview((current) => ({ ...current, patientName: event.target.value }))}
                    />
                    <select
                      className="rounded-2xl border border-primary/15 px-4 py-3"
                      value={newReview.source}
                      onChange={(event) => setNewReview((current) => ({ ...current, source: event.target.value }))}
                    >
                      <option>Google</option>
                      <option>Practo</option>
                      <option>Manual</option>
                    </select>
                    <select
                      className="rounded-2xl border border-primary/15 px-4 py-3"
                      value={newReview.rating}
                      onChange={(event) => setNewReview((current) => ({ ...current, rating: Number(event.target.value) }))}
                    >
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <option key={rating} value={rating}>
                          {rating} star
                        </option>
                      ))}
                    </select>
                    <textarea
                      rows={4}
                      className="rounded-2xl border border-primary/15 px-4 py-3 md:col-span-2"
                      placeholder="Review text"
                      value={newReview.reviewText}
                      onChange={(event) => setNewReview((current) => ({ ...current, reviewText: event.target.value }))}
                    />
                    <button type="submit" className="rounded-full bg-accent px-5 py-3 font-semibold text-white md:col-span-2">
                      Add Review
                    </button>
                  </form>
                </Panel>

                <Panel title="Published reviews">
                  <div className="space-y-3">
                    {reviews.map((review) => (
                      <div key={review._id} className="rounded-2xl border border-primary/10 bg-surface-soft p-4">
                        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                          <div>
                            <p className="font-semibold text-ink-primary">{review.patientName}</p>
                            <p className="text-sm text-ink-muted">{review.source} | {review.rating} star</p>
                            <p className="mt-2 text-sm text-ink-secondary">{review.reviewText}</p>
                          </div>
                          <div className="flex gap-2">
                            <button type="button" onClick={() => toggleReview(review)} className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white">
                              {review.isVisible ? 'Hide' : 'Show'}
                            </button>
                            <button type="button" onClick={() => deleteReview(review._id)} className="rounded-full bg-red-500 px-4 py-2 text-xs font-semibold text-white">
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Panel>
              </section>
            ) : null}

            {!loading && activeTab === 'Gallery' ? (
              <section className="space-y-6">
                <Panel title="Add gallery item">
                  <form onSubmit={submitGallery} className="grid gap-3 md:grid-cols-2">
                    <input
                      className="rounded-2xl border border-primary/15 px-4 py-3"
                      placeholder="Title"
                      value={newGallery.title}
                      onChange={(event) => setNewGallery((current) => ({ ...current, title: event.target.value }))}
                    />
                    <select
                      className="rounded-2xl border border-primary/15 px-4 py-3"
                      value={newGallery.category}
                      onChange={(event) => setNewGallery((current) => ({ ...current, category: event.target.value }))}
                    >
                      <option value="clinic">Clinic</option>
                      <option value="team">Team</option>
                      <option value="before-after">Before & After</option>
                    </select>
                    <input
                      className="rounded-2xl border border-primary/15 px-4 py-3 md:col-span-2"
                      placeholder="Image URL"
                      value={newGallery.imageUrl}
                      onChange={(event) => setNewGallery((current) => ({ ...current, imageUrl: event.target.value }))}
                    />
                    <textarea
                      rows={3}
                      className="rounded-2xl border border-primary/15 px-4 py-3 md:col-span-2"
                      placeholder="Description"
                      value={newGallery.description}
                      onChange={(event) => setNewGallery((current) => ({ ...current, description: event.target.value }))}
                    />
                    <button type="submit" className="rounded-full bg-accent px-5 py-3 font-semibold text-white md:col-span-2">
                      Save Gallery Item
                    </button>
                  </form>
                </Panel>

                <Panel title="Current gallery">
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {gallery.map((item) => (
                      <div key={item._id} className="overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-teal-sm">
                        <img src={item.imageUrl} alt={item.title || 'Gallery'} className="h-48 w-full object-cover" />
                        <div className="p-4">
                          <p className="font-semibold text-ink-primary">{item.title}</p>
                          <p className="mt-1 text-sm text-ink-muted">{item.category}</p>
                          <button
                            type="button"
                            onClick={() => deleteGallery(item._id)}
                            className="mt-4 rounded-full bg-red-500 px-4 py-2 text-xs font-semibold text-white"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Panel>
              </section>
            ) : null}

            {!loading && activeTab === 'Messages' ? (
              <Panel title="Messages inbox">
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div key={message._id} className="rounded-2xl border border-primary/10 bg-white p-5 shadow-teal-sm">
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <p className="font-semibold text-ink-primary">{message.name}</p>
                          <p className="text-sm text-ink-muted">{message.phone} | {message.email || 'No email'}</p>
                          <p className="mt-2 text-sm leading-6 text-ink-secondary">{message.message}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => markMessageRead(message)}
                            className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white"
                          >
                            {message.isRead ? 'Mark unread' : 'Mark read'}
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteMessage(message._id)}
                            className="rounded-full bg-red-500 px-4 py-2 text-xs font-semibold text-white"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
            ) : null}

            {!loading && activeTab === 'Settings' && settingsDraft ? (
              <Panel title="Clinic settings">
                <form onSubmit={saveSettings} className="grid gap-4 md:grid-cols-2">
                  <SettingField
                    label="Clinic name"
                    value={settingsDraft.clinicName || ''}
                    onChange={(value) => setSettingsDraft((current) => ({ ...current, clinicName: value }))}
                  />
                  <SettingField
                    label="Phone"
                    value={settingsDraft.phone || ''}
                    onChange={(value) => setSettingsDraft((current) => ({ ...current, phone: value }))}
                  />
                  <SettingField
                    label="Email"
                    value={settingsDraft.email || ''}
                    onChange={(value) => setSettingsDraft((current) => ({ ...current, email: value }))}
                  />
                  <SettingField
                    label="WhatsApp number"
                    value={settingsDraft.whatsappNumber || ''}
                    onChange={(value) => setSettingsDraft((current) => ({ ...current, whatsappNumber: value }))}
                  />
                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Address</label>
                    <textarea
                      rows={3}
                      className="mt-1 w-full rounded-2xl border border-primary/15 px-4 py-3"
                      value={settingsDraft.address || ''}
                      onChange={(event) => setSettingsDraft((current) => ({ ...current, address: event.target.value }))}
                    />
                  </div>
                  <SettingField
                    label="Hours"
                    value={settingsDraft.hours || ''}
                    onChange={(value) => setSettingsDraft((current) => ({ ...current, hours: value }))}
                  />
                  <SettingField
                    label="Google Maps URL"
                    value={settingsDraft.googleMapsUrl || ''}
                    onChange={(value) => setSettingsDraft((current) => ({ ...current, googleMapsUrl: value }))}
                  />
                  <button type="submit" className="rounded-full bg-accent px-5 py-3 font-semibold text-white md:col-span-2">
                    Save Settings
                  </button>
                </form>
              </Panel>
            ) : null}
          </main>
        </div>
      </div>
    </>
  )
}

function Panel({ title, children }) {
  return (
    <section className="rounded-[32px] border border-primary/10 bg-white p-6 shadow-teal-sm">
      <h2 className="font-heading text-xl font-bold text-ink-primary">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  )
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-[28px] border border-primary/10 bg-white p-5 shadow-teal-sm">
      <p className="text-xs uppercase tracking-wide text-ink-muted">{label}</p>
      <p className="mt-2 font-display text-5xl text-primary">{value}</p>
    </div>
  )
}

function AppointmentsTable({ rows, onSetStatus }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="text-xs uppercase tracking-wide text-ink-muted">
          <tr>
            <th className="pb-3">Patient</th>
            <th className="pb-3">Phone</th>
            <th className="pb-3">Service</th>
            <th className="pb-3">Date</th>
            <th className="pb-3">Status</th>
            <th className="pb-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row._id} className="border-t border-primary/10">
              <td className="py-4 font-semibold text-ink-primary">{row.name}</td>
              <td className="py-4 text-ink-secondary">{row.phone}</td>
              <td className="py-4 text-ink-secondary">{row.service}</td>
              <td className="py-4 text-ink-secondary">
                {formatIndianDate(row.date)} | {row.timeSlot}
              </td>
              <td className="py-4">
                <span className="rounded-full bg-primary-pale px-3 py-1 text-xs font-semibold capitalize text-primary">
                  {row.status}
                </span>
              </td>
              <td className="py-4">
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => onSetStatus(row._id, 'confirmed')} className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-white">
                    Confirm
                  </button>
                  <button type="button" onClick={() => onSetStatus(row._id, 'completed')} className="rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white">
                    Complete
                  </button>
                  <button type="button" onClick={() => onSetStatus(row._id, 'cancelled')} className="rounded-full bg-red-500 px-3 py-1.5 text-xs font-semibold text-white">
                    Cancel
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SettingField({ label, value, onChange }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{label}</label>
      <input
        className="mt-1 w-full rounded-2xl border border-primary/15 px-4 py-3"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}
