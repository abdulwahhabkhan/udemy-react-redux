import { SAVE_COMMENT, FETCH_COMMENTS } from 'actions/types'

function comments(state = [], action) {
  switch (action.type) {
    case SAVE_COMMENT:
      return [...state, action.payload]
    case FETCH_COMMENTS:
      return [...state, ...action.payload]
    default:
      return state
  }
}

export default comments
