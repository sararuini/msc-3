import BandItem from './BandItem';
import React from 'react';

const BandList= ({
  authUser,
  bands,
}) => (
  <ul>
    {bands.map(band => (
      <BandItem
        authUser={authUser}
        key={band.uid}
        band={band}
      />
    ))}
  </ul>
);

export default BandList;