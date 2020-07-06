import React, { Component } from 'react';
import { compose } from "recompose";
import {
    AuthUserContext,
    withAuthorization,
    withEmailVerification,
  } from "../Session";
  
import { withFirebase } from '../Firebase';

import {ModifyProfilePage} from './index';

const PublicProfilePage = () => (
    // <AuthUserContext.Consumer>
    //    {authUser => (
    //     <div>
    //       <h1>Modify Profile: {authUser.username}</h1>
    //         <ModifyProfile authUser={authUser} />
    //      </div>
    //    )}
    //  </AuthUserContext.Consumer>
    <div>
        <h1>Profile</h1>
        <ProfileElements />
    </div>
)

class MyPublicProfileBase extends Component {
    constructor(props) {
        super(props);

        this.state= {
            userProperties= [],
        }
    }

    componentDidMount() {
        this.props.firebase.user(authUser.uid).on('value', snapshot => {
            const ownProfileObj = snapshot.val();

            if (ownProfileObj) {
                const propertiesRetrieved = Object.keys(ownProfileObj).map(key => ({
                    ...ownProfileObj[key],
                    uid: key,
                }));
            }
        })
    }

    componentWillUnmount(){
        this.props.firebase.
    }

    render(){

        return(
            <div>

            </div>
        )
    }
}


const ProfileElements = withFirebase(MyPublicProfileBase);

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(PublicProfilePage);
