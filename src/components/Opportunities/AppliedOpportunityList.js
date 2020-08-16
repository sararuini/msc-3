import AppliedOpportunityItem from './AppliedOpportunityItem';
import React from 'react';

const AppliedOpportunityList = ({
  authUser,
  appliedOpportunities,
}) => (
  <ul>
    {appliedOpportunities.map(appliedOpportunity => (
      <AppliedOpportunityItem
        authUser={authUser}
        key={appliedOpportunity.uid}
        appliedOpportunity={appliedOpportunity}
      />
    ))}
  </ul>
);

export default AppliedOpportunityList;