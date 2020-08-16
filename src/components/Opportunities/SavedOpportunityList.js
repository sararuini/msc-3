import SavedOpportunityItem from './SavedOpportunityItem';
import React from 'react';

const SavedOpportunityList = ({
  authUser,
  savedOpportunities,
}) => (
  <ul>
    {savedOpportunities.map(savedOpportunity => (
      <SavedOpportunityItem
        authUser={authUser}
        key={savedOpportunity.uid}
        savedOpportunity={savedOpportunity}
      />
    ))}
  </ul>
);

export default SavedOpportunityList;