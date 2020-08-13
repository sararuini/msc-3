import React, { Component } from 'react';

class ConnectionRequestItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { authUser, connectionRequest} = this.props;

    return (
     <li>
       <span>
         Sender
          {connectionRequest.senderId}
       </span>
     </li>
    );
  }
}

export default ConnectionRequestItem;