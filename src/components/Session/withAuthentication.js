import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);
            //authentication of a user is stored in local state and passed down to other components
            this.state = {
                authUser: null,
            };
        }
        
    //listener function that gets the user authenticated from firebase
    componentDidMount() {
        this.listener = this.props.firebase.auth.onAuthStateChanged(
            authUser => {
                authUser
                ? this.setState({ authUser })
                : this.setState({ authUser: null });
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