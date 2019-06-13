import React, { PureComponent } from 'react';
import { Route } from "react-router-dom"
import { RouteProps, RouteComponentProps, Redirect } from 'react-router'
import withAuthState from './withAuthState'
import { authorizationStateReady, AuthorizationStateType } from '../store/authorization'

interface Props {
  authorizationState: AuthorizationStateType
}

class PrivateRoute extends PureComponent<RouteProps & Props> {
  renderRoute = (routeProps: RouteComponentProps<{}>) => {
    const { component, authorizationState } = this.props;
    if (authorizationState != authorizationStateReady) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { next: routeProps.location.pathname }
          }}
        />
      );
    }

    const Component = component as any;

    return <Component {...routeProps} />;
  }

  render() {
    const { component: _, ...rest } = this.props;
    return <Route {...rest} render={this.renderRoute} />;
  }
}

export default withAuthState(PrivateRoute)
