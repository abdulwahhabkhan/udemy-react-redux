import React from 'react'

import requireAuth from 'components/auth/requireAuth'

class Feature extends React.Component {
  render() {
    return <div>This is the feature!</div>
  }
}

export default requireAuth({
  isSignedIn: state => !!state.auth.token,
  redirect: '/signin',
})(Feature)
