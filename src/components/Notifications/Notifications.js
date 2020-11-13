import React, { Component } from "react";

import { AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";
import NotificationList from "./NotificationList";
import notificationStyle from "./styles";
import { View, Text } from "react-native-web";

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


  deleteNotification = (userUid, notificationUid) => {
    console.log("deleted notification");
    this.props.firebase.notification(userUid, notificationUid).remove();
  };

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
            {loading && <Text style={notificationStyle.normal_text}>Loading ...</Text>}

            {notifications && <Text style={notificationStyle.normal_text}> Recent Notifications: </Text>}

            {notifications && (
              <NotificationList
                authUser={authUser}
                notifications={notifications}
                deleteNotification={this.deleteNotification}
              />
            )}

            {!notifications && <Text style={notificationStyle.normal_text}> There are no notifications</Text>}

            {!loading && notifications && notifications.length > 10 && (
              <button type="button" onClick={this.onNextPage}>
              <Text style={notificationStyle.normal_text}>  More notifications </Text>
              </button>
            )}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Notifications);
