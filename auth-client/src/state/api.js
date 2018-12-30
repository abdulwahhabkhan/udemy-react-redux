export async function signUp(email, password) {
  const result = await post('signup', { email, password })
  return { token: result.token }
}

export async function signIn(email, password) {
  const result = await post('signin', { email, password })
  return { token: result.token }
}

// function get(path, token) {
//   return _fetch(path, { token })
// }

function post(path, body, token) {
  return _fetch(path, { method: 'POST', body, token })
}

async function _fetch(path, { method = 'GET', body, token }) {
  console.log('_fetch', `${method} ${path}`, { body, token })
  await new Promise(resolve => setTimeout(resolve, 1000))
  switch (path) {
    case 'signup':
    case 'signin':
      return { token: 'fake.jwt.token' }
    default:
      throw new ApiError(400, { _error: 'Bad request' })
  }

  // const options = { method, headers: {} }
  // if (method === 'POST') {
  //   options.headers['Content-Type'] = 'application/json; charset=utf-8'
  //   options.body = JSON.stringify(body)
  // }
  // if (token) options.headers['Authorization'] = `Bearer ${token}`

  // const response = await fetch(`https://localhost:3090/${path}`, options)
  // const body = await response.json()
  // if (!response.ok) throw new ApiError(response.status, body)
  // return body
}

export class ApiError extends Error {
  constructor(status, body) {
    super(status)
    this.__proto__ = ApiError.prototype
    this.body = body
  }
}
ApiError.prototype.name = ApiError.name
