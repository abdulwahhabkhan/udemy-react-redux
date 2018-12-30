import { SAVE_COMMENT } from 'actions/types'
import comments from 'reducers/comments'

it('handles actions of type SAVE_COMMENT', () => {
  const action = {
    type: SAVE_COMMENT,
    payload: 'New comment.',
  }
  const newState = comments([], action)

  expect(newState).toEqual(['New comment.'])
})

xit('handles actions of type FETCH_COMMENTS', () => {})

it('ignores actions with unknown type', () => {
  const state = {}
  const newState = comments(state, { type: 'gobbledygook' })
  expect(newState).toBe(state)
})
