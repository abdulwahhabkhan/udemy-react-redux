const asyncMiddleware = store => next => action => {
  const { payload } = action
  if (payload && typeof payload.then === 'function') {
    return payload.then(result => {
      store.dispatch({ ...action, payload: result })
    })
  } else {
    return next(action)
  }
}

export default asyncMiddleware
