import React from 'react'
import { mount } from 'enzyme'

import CommentBox from 'components/CommentBox'
import Root from 'Root'

let wrapped

beforeEach(() => {
  wrapped = mount(
    <Root>
      <CommentBox />
    </Root>
  )
})

afterEach(() => {
  wrapped.unmount()
})

it('has a text area and two buttons', () => {
  expect(wrapped.find('textarea')).toHaveLength(1)
  expect(wrapped.find('button')).toHaveLength(2)
})

describe('the text area', () => {
  beforeEach(() => {
    wrapped.find('textarea').simulate('change', {
      target: { value: 'New comment.' },
    })
    wrapped.update()
  })

  it('lets users enter text', () => {
    expect(wrapped.find('textarea').prop('value')).toBe('New comment.')
  })

  it('gets emptied on submit', () => {
    wrapped.find('form').simulate('submit')
    wrapped.update()

    expect(wrapped.find('textarea').prop('value')).toBe('')
  })
})
