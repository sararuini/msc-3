import ApplicantItem from './ApplicantItem';
import React from 'react';

const ApplicantList = ({
  authUser,
  applicants,
}) => (
  <ul>
    {applicants.map(applicant => (
      <ApplicantItem
        authUser={authUser}
        key={applicants.uid}
        applicant={applicant}
      />
    ))}
  </ul>
);

export default ApplicantList;