import React from 'react';
import { Link } from 'react-router-dom'; //"Link" enables navigation to different routes
// router which routes with equivalent react components 

import * as ROUTES from '../../constants/routes'; // access to routes file

//Navigation compinent is rendered in 'App' Component
const Navigation = () => (
    <div>
        <ul>
            <li>
                <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            </li>
            <li>
                <Link to={ROUTES.LANDING}>Landing</Link>
            </li>
            <li>
                <Link to={ROUTES.HOME}>Home</Link>
            </li>
            <li>
                <Link to={ROUTES.ACCOUNT}>Account</Link>
            </li>
            <li>
                <Link to={ROUTES.ADMIN}>Admin</Link>
            </li>
        </ul>
    </div>
);

export default Navigation;