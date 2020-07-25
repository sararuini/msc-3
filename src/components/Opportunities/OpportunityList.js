import React from 'react';

import OpportunityItem from './OpportunityItem';

const OpportunityList = ({
  authUser,
  opportunities,
  onEditOpportunity,
  onRemoveOpportunity,
  onSaveOpportunity,
}) => (
  <ul>
    {opportunities.map(opportunity => (
      <OpportunityItem
        authUser={authUser}
        key={opportunity.uid}
        opportunity={opportunity}
        onEditOpportunity={onEditOpportunity}
        onRemoveOpportunity={onRemoveOpportunity}
        onSaveOpportunity={onSaveOpportunity}
      />
    ))}
  </ul>
);

export default OpportunityList;