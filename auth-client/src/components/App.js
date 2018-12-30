import React from 'react'
import { Route } from 'react-router-dom'

import Signin from 'components/auth/Signin'
import Signout from 'components/auth/Signout'
import Signup from 'components/auth/Signup'
import Feature from 'components/Feature'
import Header from 'components/Header'
import Welcome from 'components/Welcome'

function App() {
  return (
    <div>
      <Header />
      <Route exact path="/" component={Welcome} />
      <Route path="/feature" component={Feature} />
      <Route path="/signin" component={Signin} />
      <Route path="/signout" component={Signout} />
      <Route path="/signup" component={Signup} />
    </div>
  )
}

export default App
