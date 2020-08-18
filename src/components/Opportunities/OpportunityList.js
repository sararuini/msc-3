import React from 'react';

import OpportunityItem from './OpportunityItem';

const OpportunityList = ({
  authUser,
  opportunities,
  onEditOpportunity,
  onRemoveOpportunity,
  /*
  onSaveOpportunity,
  onUnsaveOpportunity,
  onApplyToOpportunity,
  */
}) => (
  <ul>
    {opportunities.map(opportunity => (
      <OpportunityItem
        authUser={authUser}
        key={opportunity.uid}
        opportunity={opportunity}
        onEditOpportunity={onEditOpportunity}
        onRemoveOpportunity={onRemoveOpportunity}
        /*
        onSaveOpportunity={onSaveOpportunity}
        onUnsaveOpportunity={onUnsaveOpportunity}
        onApplyToOpportunity={onApplyToOpportunity}
        */
      />
    ))}
  </ul>
);

export default OpportunityList;