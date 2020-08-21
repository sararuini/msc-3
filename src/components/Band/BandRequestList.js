import BandRequestItem from './BandRequestItem';
import React from 'react';

const BandRequestList = ({
  authUser,
  bandMembersRequests,
  band
}) => (
  <ul>
    {bandMembersRequests.map(user => (
      <BandRequestItem
        authUser={authUser}
        key={user.uid}
        user={user}
        band={band}
      />
    ))}
  </ul>
);

export default BandRequestList;