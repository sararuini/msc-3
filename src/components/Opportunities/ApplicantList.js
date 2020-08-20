import ApplicantItem from './ApplicantItem';
import React from 'react';

const ApplicantList = ({
  authUser,
  applicants,
  opportunity,
}) => (
  <ul>
    {applicants.map(applicant => (
      <ApplicantItem
        authUser={authUser}
        key={applicant.uid}
        applicant={applicant}
        opportunity={opportunity}
      />
    ))}
  </ul>
);

export default ApplicantList;