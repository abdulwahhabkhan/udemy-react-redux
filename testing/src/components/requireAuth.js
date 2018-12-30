import React from 'react'
import { connect } from 'react-redux'

function requireAuth(Component) {
  class RequireAuth extends React.Component {
    componentDidMount() {
      this.checkAuth()
    }

    componentDidUpdate() {
      this.checkAuth()
    }

    checkAuth() {
      if (!this.props.auth) {
        this.props.history.push('/')
      }
    }

    render() {
      return <Component {...this.props} />
    }
  }

  const mapStateToProps = state => ({
    auth: state.auth,
  })

  return connect(mapStateToProps)(RequireAuth)
}

export default requireAuth
