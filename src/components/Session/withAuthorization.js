import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

//Authorisation is used to make sure that sensible information is not accessed by users that are not logged in
const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    // main authorisation logic, uses a firebase listeners to trigger
    //a callback function every time the authenticated user changes
    componentDidMount() {
      //using firebase class logic to merge authentication and database user

      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.SIGN_IN);
          }
        },
        () => this.props.history.push(ROUTES.SIGN_IN)
      );
    }

    componentWillUnmount() {
      this.listener();
    }
    // render displays the components that are accessible to auth users only

    render() {
      return (
        <AuthUserContext.Consumer>
          {(authUser) =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(withRouter, withFirebase)(WithAuthorization);
};

export default withAuthorization;
