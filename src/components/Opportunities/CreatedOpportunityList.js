import React from 'react';

import CreatedOpportunityItem from './CreatedOpportunityItem';

const CreatedOpportunityList = ({
  authUser,
  opportunitiesCreated,
  onEditOpportunity,
  onRemoveOpportunity,
}) => (
  <ul>
    {opportunitiesCreated.map(opportunityCreated => (
      <CreatedOpportunityItem
        authUser={authUser}
        key={opportunityCreated.uid}
        opportunityCreated={opportunityCreated}
        onEditOpportunity={onEditOpportunity}
        onRemoveOpportunity={onRemoveOpportunity}
      />
    ))}
  </ul>
);

export default CreatedOpportunityList;