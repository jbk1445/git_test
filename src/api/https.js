import http from './http'

export function post (url, data) {
  const token = localStorage.getItem('token')
  const headers = {
    Authorization: `Bearer ${token}`
  }
  return http.post(url, data, { headers })
}
export function get (url) {
  const token = localStorage.getItem('token')
  const headers = {
    Authorization: `Bearer ${token}`
  }
  return http.get(url, { headers })
}
export function patch (url, data) {
  const token = localStorage.getItem('token')
  const headers = {
    Authorization: `Bearer ${token}`
  }
  return http.patch(url, data, { headers })
}
export function del (url) {
  const token = localStorage.getItem('token')
  const headers = {
    Authorization: `Bearer ${token}`
  }
  return http.delete(url, { headers })
}
export function view (url, params) {
  const token = localStorage.getItem('token')
  const headers = {
    Authorization: `Bearer ${token}`
  }
  return http.get(url, { params, headers })
}
