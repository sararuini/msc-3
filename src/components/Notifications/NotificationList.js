import React from 'react';

import NotificationItem from './NotificationItem';

const NotificationList = ({
  authUser,
  notifications,
  deleteNotification,
}) => (
  <ul>
    {notifications.map(notification => (
      <NotificationItem
        authUser={authUser}
        key={notification.uid}
        notification={notification}
        deleteNotification={deleteNotification}
      />
    ))}
  </ul>
);

export default NotificationList;