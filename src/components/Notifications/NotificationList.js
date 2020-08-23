import React from 'react';

import NotificationItem from './NotificationItem';

const NotificationList = ({
  authUser,
  notifications,
}) => (
  <ul>
    {notifications.map(notification => (
      <NotificationItem
        authUser={authUser}
        key={notification.uid}
        notification={notification}
      />
    ))}
  </ul>
);

export default NotificationList;