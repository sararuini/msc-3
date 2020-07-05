import React, { Component } from 'react';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';

import {ModifyProfilePage} from '../ModifyProfile';

const MyPublicProfile = () => (
    <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <h1>Modify Profile: {authUser.username}</h1>
          <ModifyProfile authUser={authUser} />
        </div>
      )}
    </AuthUserContext.Consumer>
)

class MyPublicProfileBase extends Component {
    constructor(props) {
        super(props);

        this.state= {
            loading: false,
        }
    }

    componentDidMount() {
        this.setState({loading: true});

        this.props.firebase.user().on('value', snapshot => {
            const ownProfileObj = snapshot.val();
            if (ownProfileObj) {
                const properties = Object.keys(ownProfileObj).map(key => ({
                    ...ownProfileObj[key],
                    uid: key,
                }));
            }

            this.setState({loading: false});
        })
    }
}