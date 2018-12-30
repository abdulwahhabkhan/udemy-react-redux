import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { reducer as form } from 'redux-form'
import thunk from 'redux-thunk'

import auth, * as authActions from 'state/auth'

// Actions

export const actions = {
  ...authActions,
}

// Reducer

const state = combineReducers({
  auth,
  form,
})

export function wrap(component) {
  const store = createStore(state, {}, applyMiddleware(thunk))
  return <Provider store={store}>{component}</Provider>
}
