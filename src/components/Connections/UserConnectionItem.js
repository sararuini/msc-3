import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

class UserConnectionItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    }
  }

  render() {
    const { authUser, connection, deleteConnection} = this.props;

    return (
      <div>
         { authUser && (
         <span>
           <span>Connection id: {connection.uid}</span>
           <span> Your connection is</span>
           <Link
                  to={{
                    pathname: `${ROUTES.USERS}/${connection.user}`,
                    //state: { user },
                  }}
                > 
                  {connection.user}
                </Link>
           <button onClick={() => deleteConnection(connection.uid)}> Delete Connection</button>
         </span>  
      )}
      </div>      
    );
  }
}

export default withFirebase(UserConnectionItem);