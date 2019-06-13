import React, { Component } from 'react';
import { AppState } from '../store'
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux'
import { listenForAuthorizationUpdates, AuthorizationState } from '../store/authorization'

const mapStateToProps = (state: AppState) => {
  const { authorizationState } = state.authorization
  return {
    authorizationState
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators(
    { listenForAuthorizationUpdates },
    dispatch
  )

interface Props {
  authorizationState: AuthorizationState
  listenForAuthorizationUpdates: typeof listenForAuthorizationUpdates
}

function withAuthState(WrappedComponent: any) {
  const C = class extends Component<any, Props> {
    componentDidMount() {
      const { listenForAuthorizationUpdates } = this.props
      listenForAuthorizationUpdates()
    }

    render() {
      return <WrappedComponent authorizationState={this.props.authorizationState} {...this.props} />
    }
  }
  return connect(mapStateToProps, mapDispatchToProps)(C)
}

export default withAuthState
