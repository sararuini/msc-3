import UserConnectionItem from './UserConnectionItem';
import React from 'react';

const UserConnectionList= ({
  authUser,
  connections,
  deleteConnection,
}) => (
  <ul>
    {connections.map(connection => (
      <UserConnectionItem
        authUser={authUser}
        key={connection.uid}
        connection={connection}
        deleteConnection={deleteConnection}
      />
    ))}
  </ul>
);

export default UserConnectionList;