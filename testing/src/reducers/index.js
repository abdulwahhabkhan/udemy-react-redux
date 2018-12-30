import { combineReducers } from 'redux'

import auth from 'reducers/auth'
import comments from 'reducers/comments'

export default combineReducers({
  auth,
  comments,
})
