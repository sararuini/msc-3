import React from 'react';

import ConnectionRequestItem from './ConnectionRequestItem';

const ConnectionRequestList = ({
  authUser,
  connectionRequests,
  acceptConnectionRequest,
  //declineConnectionRequest,
}) => (
  <ul>
    {connectionRequests.map(connectionRequest => (
      <ConnectionRequestItem
        authUser={authUser}
        key={connectionRequest.uid}
        connectionRequest={connectionRequest}
        acceptConnectionRequest={acceptConnectionRequest}
        //declineConnectionRequest={declineConnectionRequest}
      />
    ))}
  </ul>
);

export default ConnectionRequestList;