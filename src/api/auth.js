import instance from './http'

export function login (loginId, password) {
  return instance.post('/login', {
    loginId,
    password
  })
}
