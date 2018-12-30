import React from 'react'
import { connect } from 'react-redux'

const requireAuth = ({ isSignedIn, redirect }) => Component => {
  class RequireAuth extends React.Component {
    componentDidMount() {
      this.checkAuth()
    }

    componentDidUpdate() {
      this.checkAuth()
    }

    checkAuth() {
      if (!this.props.signedIn && redirect) {
        this.props.history.push(redirect)
      }
    }

    render() {
      const { signedIn } = this.props
      return signedIn ? <Component {...this.props} /> : null
    }
  }

  const mapStateToProps = state => ({
    signedIn: isSignedIn(state),
  })

  return connect(mapStateToProps)(RequireAuth)
}

export default requireAuth
