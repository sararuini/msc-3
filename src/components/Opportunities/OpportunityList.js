import React from 'react';

import OpportunityItem from './OpportunityItem';

const OpportunityList = ({
  authUser,
  opportunities,
  onEditOpportunity,
  onRemoveOpportunity,
}) => (
  <ul>
    {opportunities.map(opportunity => (
      <OpportunityItem
        authUser={authUser}
        key={opportunity.uid}
        opportunity={opportunity}
        onEditOpportunity={onEditOpportunity}
        onRemoveOpportunity={onRemoveOpportunity}
      />
    ))}
  </ul>
);

export default OpportunityList;