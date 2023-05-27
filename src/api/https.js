import http from './http'

const token = localStorage.getItem('token')
const headers = {
  Authorization: `Bearer ${token}`
}
export async function post (url, data) {
  return http.post(url, data, { headers })
}
export async function get (url) {
  return http.get(url, { headers })
}
export async function patch (url, data) {
  return http.patch(url, data, { headers })
}
export async function del (url) {
  return http.delete(url, { headers })
}
export async function view (url, params) {
  return http.get(url, { params }, { headers })
}
