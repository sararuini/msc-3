import React from 'react';
import {Switch, Route } from 'react-router-dom';
import {compose} from 'recompose';

import {withAuthorization, withEmailVerification} from '../Session';
import { UserList, UserItem } from '../Users';

import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';


const AdminPage = () => (
    <div>
        <h1>Admin</h1>
            <p>This is the admin page</p>
        <Switch>
            <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
            <Route exact path={ROUTES.ADMIN} component={UserList}/>
        </Switch>
    </div>
)
const condition = authUser =>
    authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(
    withAuthorization(condition),
    withEmailVerification,
)(AdminPage);