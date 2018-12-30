import { mount } from 'enzyme'
import React from 'react'

import CommentList from 'components/CommentList'
import Root from 'Root'

let wrapped
let comments = ['first', 'second']

beforeEach(() => {
  const state = { comments }
  wrapped = mount(
    <Root initialState={state}>
      <CommentList />
    </Root>
  )
})

afterEach(() => {
  wrapped.unmount()
})

it('creates one `li` element per comment', () => {
  expect(wrapped.find('li')).toHaveLength(comments.length)
})

it('shows the text from each comment', () => {
  const lis = wrapped.find('li')
  comments.forEach((comment, i) => expect(lis.at(i).text()).toBe(comment))
})
