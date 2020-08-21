import BandMemberItem from './BandMemberItem';
import React from 'react';

const BandMemberList = ({
  authUser,
  bandMembers,
}) => (
  <ul>
    {bandMembers.map(bandMember => (
      <BandMemberItem
        authUser={authUser}
        key={bandMember.uid}
      />
    ))}
  </ul>
);

export default BandMemberList;