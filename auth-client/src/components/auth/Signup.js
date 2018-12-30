import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'

import { actions } from 'state'
import { ApiError } from 'state/api'

class Signup extends React.Component {
  handleSubmit = this.props.handleSubmit(async data => {
    try {
      await this.props.signUp(data)
      this.props.history.push('/feature')
    } catch (err) {
      if (err instanceof ApiError) throw new SubmissionError(err.body)
      throw err
    }
  })

  render() {
    const { error, pristine, submitting } = this.props
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset disabled={submitting}>
          <label htmlFor="email">Email</label>
          <Field
            name="email"
            component="input"
            type="text"
            autoComplete="none"
          />
          <label htmlFor="password">Password</label>
          <Field
            name="password"
            component="input"
            type="password"
            autoComplete="none"
          />
          {error && <span>{error}</span>}
          <button disabled={pristine} type="submit">
            Sign Up
          </button>
        </fieldset>
      </form>
    )
  }
}

export default compose(
  connect(null, actions), // prettier-ignore
  reduxForm({ form: 'signup' })
)(Signup)
