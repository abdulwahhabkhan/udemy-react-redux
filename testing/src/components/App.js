import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'

import * as actions from 'actions'
import CommentBox from 'components/CommentBox'
import CommentList from 'components/CommentList'

class App extends Component {
  handleChangeAuth = () => {
    this.props.changeAuth(!this.props.auth)
  }

  render() {
    return (
      <div>
        {this.renderHeader()}
        <Route path="/post" component={CommentBox} />
        <Route exact path="/" component={CommentList} />
      </div>
    )
  }

  renderHeader() {
    return (
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/post">Post a Comment</Link>
        </li>
        <li>{this.renderAuth()}</li>
      </ul>
    )
  }

  renderAuth() {
    return (
      <button onClick={this.handleChangeAuth}>
        {this.props.auth ? 'Sign Out' : 'Sign In'}
      </button>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(
  mapStateToProps,
  actions
)(App)
