import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import { UserList, UserItem } from '../Users';
import * as ROUTES from '../../constants/routes';

const UsersDisplayPage = () => (
  <div>
    <Switch>
      <Route exact path={ROUTES.USER_PROFILE} component={UserItem} />
      <Route exact path={ROUTES.USERS} component={UserList} />
    </Switch>
  </div>
);

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(UsersDisplayPage);