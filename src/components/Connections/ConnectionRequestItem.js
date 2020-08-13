import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

class ConnectionRequestItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    }
  }

  render() {
    const { authUser, connectionRequest, acceptConnectionRequest, declineConnectionRequest} = this.props;

    return (
      <div>
         { authUser.uid === connectionRequest.receiverId && (
         <span>
           <span>Connection request: {connectionRequest.uid}</span>
           <span> Sender</span>
           <Link
                  to={{
                    pathname: `${ROUTES.USERS}/${connectionRequest.senderId}`,
                    //state: { user },
                  }}
                > 
                  {connectionRequest.senderId}
                </Link>
           <span> would like to connect with you </span>
           <button onClick={acceptConnectionRequest}> Accept</button>
           <button onClick={() => declineConnectionRequest(connectionRequest.uid)}> Decline</button>
         </span>  
      )}
      </div>      
    );
  }
}

export default withFirebase(ConnectionRequestItem);