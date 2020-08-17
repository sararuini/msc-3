import React from 'react';

import CreatedOpportunityItem from './CreatedOpportunityItem';

const CreatedOpportunityList = ({
  authUser,
  opportunitiesCreated,
}) => (
  <ul>
    {opportunitiesCreated.map(opportunityCreated => (
      <CreatedOpportunityItem
        authUser={authUser}
        key={opportunityCreated.uid}
        opportunityCreated={opportunityCreated}
      />
    ))}
  </ul>
);

export default CreatedOpportunityList;