import React, { Component } from "react";

import { AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";
import NotificationList from "./NotificationList";

class Notifications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      notifications: [],
      limit: 10,
    };
  }

  componentDidMount() {
    this.onListenForNotifications();
  }

  onListenForNotifications = () => {
    this.setState({ loading: true });
    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const currentUser = this.props.firebase.auth.currentUser;
        const currentUserId = currentUser.uid;

        this.props.firebase
          .notifications(currentUserId)
          .orderByChild("createdAt")
          .limitToLast(this.state.limit)
          .on("value", (snapshot) => {
            const notificationObj = snapshot.val();

            if (notificationObj) {
              const notificationList = Object.keys(notificationObj).map(
                (key) => ({
                  ...notificationObj[key],
                  uid: key,
                })
              );

              this.setState({
                notifications: notificationList,
              });
            } else {
              this.setState({ notifications: null });
            }
          });
        this.setState({ loading: false });
      }
    });
  };

  componentWillUnmount() {
    this.props.firebase.notifications().off();
  }

  onNextPage = () => {
    this.setState(
      (state) => ({ limit: state.limit + 10 }),
      this.onListenForNotifications
    );
  };

  render() {
    const { notifications, limit, loading } = this.state;

    const { authUser } = this.props;

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div>
            {loading && <div>Loading ...</div>}

            {notifications && <span> Recent Notifications: </span>}

            {notifications && (
              <NotificationList
                authUser={authUser}
                notifications={notifications}
              />
            )}

            {!notifications && <span> There are no notifications</span>}

            {!loading && notifications && notifications.length > 10 && (
              <button type="button" onClick={this.onNextPage}>
                More notifications
              </button>
            )}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Notifications);
