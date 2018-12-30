import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from 'components/App'
import { wrap } from 'state'

ReactDOM.render(
  wrap(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ),
  document.getElementById('root')
)
