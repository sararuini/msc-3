import React from 'react';

import OpportunityItem from './OpportunityItem';

const OpportunityList = ({
  authUser,
  opportunities,
  /*
  onSaveOpportunity,
  onUnsaveOpportunity,
  onApplyToOpportunity,*/
  
}) => (
  <ul>
    {opportunities.map(opportunity => (
      <OpportunityItem
        authUser={authUser}
        key={opportunity.uid}
        opportunity={opportunity}
        /*
        onSaveOpportunity={onSaveOpportunity}
        onUnsaveOpportunity={onUnsaveOpportunity}
        onApplyToOpportunity={onApplyToOpportunity}*/
        
      />
    ))}
  </ul>
);

export default OpportunityList;