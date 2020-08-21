import BandMemberItem from './BandMemberItem';
import React from 'react';

const BandMemberList = ({
  authUser,
  bandMembers,
  band
}) => (
  <ul>
    {bandMembers.map(bandMember => (
      <BandMemberItem
        authUser={authUser}
        key={bandMember.uid}
        bandMember={bandMember}
        band={band}
      />
    ))}
  </ul>
);

export default BandMemberList;