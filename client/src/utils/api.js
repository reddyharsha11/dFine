import axios from 'axios'

/** Use relative paths without a leading slash so baseURL joins correctly in the browser. */
const baseURL = (import.meta.env.VITE_API_URL?.trim() || '/api').replace(/\/$/, '')

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('dfine_admin_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export function getErrorMessage(err, fallback = 'Something went wrong') {
  return err?.response?.data?.message || err?.message || fallback
}
