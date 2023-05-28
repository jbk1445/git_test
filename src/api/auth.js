import instance from './http'

export function login (userid, password) {
  return instance.post('/login', {
    loginId: userid,
    password: password
  })
}
