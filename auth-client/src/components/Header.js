import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import 'styles/Header.css'

class Header extends React.Component {
  render() {
    const { signedIn } = this.props
    return (
      <nav className="Header">
        <Link to="/">App</Link>{' '}
        {signedIn ? (
          <div>
            <Link to="/feature">Feature</Link>
            <Link to="/signout">Sign Out</Link>
          </div>
        ) : (
          <div>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  signedIn: !!state.auth.token,
})

export default connect(mapStateToProps)(Header)
