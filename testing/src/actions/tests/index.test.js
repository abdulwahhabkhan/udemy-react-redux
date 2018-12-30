import { saveComment } from 'actions'
import { SAVE_COMMENT } from 'actions/types'

describe('saveComment', () => {
  it('has the correct type', () => {
    const action = saveComment()
    expect(action.type).toBe(SAVE_COMMENT)
  })

  it('has the correct payload', () => {
    const action = saveComment('New comment.')
    expect(action.payload).toBe('New comment.')
  })
})

xdescribe('fetchComments', () => {
  it('has the correct type', () => {
    //...
  })

  it('has the correct payload', () => {
    //...
  })
})
