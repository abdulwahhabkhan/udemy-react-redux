import tv4 from 'tv4'

import stateSchema from 'reducers/stateSchema'

const stateValidator = store => next => action => {
  const result = next(action)

  const validation = tv4.validateMultiple(store.getState(), stateSchema)
  if (!validation.valid) {
    console.warn('Invalid state:', validation.errors)
  }

  return result
}

export default stateValidator
