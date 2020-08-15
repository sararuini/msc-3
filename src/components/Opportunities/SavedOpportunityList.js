import SavedOpportunityItem from './SavedOpportunityItem';
import React from 'react';

const SavedOpportunityList = ({
  authUser,
  savedOpportunities,
  //acceptConnectionRequest,
  //declineConnectionRequest,
}) => (
  <ul>
    {savedOpportunities.map(savedOpportunity => (
      <SavedOpportunityItem
        authUser={authUser}
        key={connectionRequest.uid}
        savedOpportunity={savedOpportunity}
        //acceptConnectionRequest={acceptConnectionRequest}
      />
    ))}
  </ul>
);

export default SavedOpportunityList;