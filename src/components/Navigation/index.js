import React from 'react';
import { Link } from 'react-router-dom'; //"Link" enables navigation to different routes
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes'; // access to routes file
import { AuthUserContext } from '../Session';

//Navigation compinent is rendered in 'App' Component
const Navigation = () => (
    <div>
        <AuthUserContext.Consumer>
            {
            authUser =>
            authUser ? <NavigationAuth/> : <NavigationNonAuth />
            }
        </AuthUserContext.Consumer>
    </div> // checks whether user is authenticated or not
);


//Navigation options if a user is authenticated
const NavigationAuth = () => (
    <ul>
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
            <SignOutButton />
        </li>
    </ul>
);

//Navigation options if a user is not authenticated

const NavigationNonAuth = () => (
    <ul>
        <li>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>        
        <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </li>            
    </ul>
);

export default Navigation;