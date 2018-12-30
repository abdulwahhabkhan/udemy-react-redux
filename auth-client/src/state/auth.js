import * as api from 'state/api'

const TOKEN = 'token'

// Actions

const SET_TOKEN = 'auth/set-token'

export const signUp = ({ email, password }) => async dispatch => {
  const { token } = await api.signUp(email, password)
  dispatch(setToken(token))
}

export const signIn = ({ email, password }) => async dispatch => {
  const { token } = await api.signIn(email, password)
  dispatch(setToken(token))
}

export function signOut() {
  return setToken(null)
}

function setToken(token) {
  if (token) localStorage.setItem(TOKEN, token)
  else localStorage.removeItem(TOKEN)
  return { type: SET_TOKEN, token: token || null }
}

// Reducer

const defaultState = {
  token: localStorage.getItem(TOKEN),
}

export default function auth(state = defaultState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return { token: action.token }
    default:
      return state
  }
}
