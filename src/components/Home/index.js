import React from 'react';
import { withAuthorization } from '../Session';

const HomePage= () => (
    <div>
        <h1> Home Page (accessible by logged-in users only)</h1>
    </div>
);

// authorization condition
const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);