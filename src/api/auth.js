import instance from './http'

export async function login (userid, password) {
  return instance.post('/login', {
    loginId: userid,
    password: password
  })
}
