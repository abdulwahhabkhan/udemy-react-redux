import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import requireAuth from 'components/auth/requireAuth'
import { actions } from 'state'

class Signout extends React.Component {
  componentDidMount() {
    setTimeout(this.props.signOut, 1000)
  }
  render() {
    return <div>Sorry to see you go.</div>
  }
}

export default compose(
  requireAuth({
    isSignedIn: state => !!state.auth.token,
    redirect: '/',
  }),
  connect(null, actions) // prettier-ignore
)(Signout)
