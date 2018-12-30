import { mount } from 'enzyme'
import moxios from 'moxios'
import React from 'react'

import App from 'components/App'
import Root from 'Root'

beforeEach(() => {
  moxios.install()
  moxios.stubRequest('https://jsonplaceholder.typicode.com/comments', {
    status: 200,
    response: [{ name: 'first' }, { name: 'second' }, { name: 'third' }],
  })
})

afterEach(() => {
  moxios.uninstall()
})

it('can fetch and display a list of comments', done => {
  const wrapped = mount(
    <Root>
      <App />
    </Root>
  )

  wrapped.find('button.fetch-comments').simulate('click')
  moxios.wait(() => {
    wrapped.update()

    expect(wrapped.find('li')).toHaveLength(3)

    wrapped.unmount()
    done()
  })
})
