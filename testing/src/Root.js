import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'

import asyncMiddleware from 'middlewares/async'
import stateValidator from 'middlewares/stateValidator'
import reducers from 'reducers'

const Root = props => {
  // FIXME: don't call createStore at every render
  const store = createStore(
    reducers,
    props.initialState,
    applyMiddleware(asyncMiddleware, stateValidator)
  )
  return <Provider store={store}>{props.children}</Provider>
}

export default Root
