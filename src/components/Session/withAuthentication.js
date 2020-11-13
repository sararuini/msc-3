import React from "react";

import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";

const withAuthentication = Component => {

  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      //authentication of a user is stored in local state and passed down to other components
      this.state = {
        authUser: JSON.parse(localStorage.getItem('authUser')),
      };
    }

    //listener function that gets the user authenticated from firebase
    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
         
          localStorage.setItem('authUser', JSON.stringify(authUser));
          this.setState({ authUser });
        },
        () => {
          localStorage.removeItem('authUser');
          this.setState({ authUser: null });
        },
      );
    }

    // the listener is removed if component unmounts
    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;
{/* 
Sources: 
Used code template from book / code repo:
Wieruch, R. (2019) The road to React with Firebase.    
Wieruch, R. (2020) React-firebase-authentication. Available at: https://github.com/the-road-to-react-with-firebase/react-firebase-authentication (Accessed: 12 June 2020).
*/}