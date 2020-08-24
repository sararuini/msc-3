import React, { Component } from "react";

import { withFirebase } from "../Firebase";

import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";

class NotificationProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notificationType: "",
      type: "",
      createdAt: "",
      statusMessage: "",
      opportunity: "",
      bandApplicant: "",
      band: "",
      senderId: "",
      user: "",
      username: "",
      bandName: "",
      opportunityTitle: "",
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.checkNotificationType();
    this.setState({ loading: false });
  }

  checkNotificationType = () => {
    const notificationId = this.props.match.params.id;
    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const currentUser = this.props.firebase.auth.currentUser;
        const currentUserId = currentUser.uid;
        console.log("noootification " + notificationId);

        this.props.firebase
          .notification(currentUserId, notificationId)
          .once("value", (snapshot) => {
            const notificationObj = snapshot.val();
            if (notificationObj) {
              for (const property in notificationObj) {
                if (notificationObj.hasOwnProperty(property)) {
                  if (property === "type") {
                    this.setState({
                      type: notificationObj[property],
                    });

                    switch (this.state.type) {
                      case "Accepted Connection Request":
                        this.connectionRequestResponded(
                          currentUserId,
                          notificationId
                        );
                        break;
                      case "Declined Connection Request":
                        this.connectionRequestResponded(
                          currentUserId,
                          notificationId
                        );
                        break;
                      case "Band Member Request":
                        this.bandMemberRequestReceived(
                          currentUserId,
                          notificationId,
                        );
                        break;
                      case "Connection Request Received":
                        this.connectionRequestReceived(
                          currentUserId,
                          notificationId
                        );
                        break;
                      case "Opportunity Status Notification":
                        this.opportunityStatus(currentUserId, notificationId);
                        break;
                      case "Approved Band Member":
                        this.bandMemberNotification(
                          currentUserId,
                          notificationId
                        );
                        break;
                      case "Declined Band Member":
                        this.bandMemberNotification(
                          currentUserId,
                          notificationId
                        );
                        break;
                    }
                  } else if (property === "createdAt") {
                    this.setState({
                      createdAt: notificationObj[property],
                    });
                  }
                }
              }
            }
          });
      }
    });
  };

  connectionRequestResponded = (user, notification) => {
    this.props.firebase
      .notification(user, notification)
      .once("value", (snapshot) => {
        const notificationObj = snapshot.val();
        if (notificationObj) {
          for (const property in notificationObj) {
            if (notificationObj.hasOwnProperty(property)) {
              if (property === "user") {
                this.setState({
                  user: notificationObj[property],
                });
                console.log("user " + this.state.user);
              }
            }
          }
        }
      });

    this.props.firebase.user(this.state.user).once("value", (snapshot) => {
      const userObj = snapshot.val();
      this.setState({
        username: userObj.username,
      });
    });
    console.log("connection request" + this.state.username)
  };

  connectionRequestReceived = (user, notification) => {
    this.props.firebase
      .notification(user, notification)
      .once("value", (snapshot) => {
        const notificationObj = snapshot.val();
        if (notificationObj) {
          for (const property in notificationObj) {
            if (notificationObj.hasOwnProperty(property)) {
              if (property === "senderId") {
                this.setState({
                  senderId: notificationObj[property],
                });
                console.log("senderId " + this.state.senderId);
              }
            }
          }
        }
      });
    this.props.firebase.user(this.state.senderId).once("value", (snapshot) => {
      const userObj = snapshot.val();
      this.setState({
        username: userObj.username,
      });
    });
  };

  /*
  bandMemberRequestReceived = (user, notification) => {
    this.props.firebase
      .notification(user, notification)
      .once("value", (snapshot) => {
        const notificationObj = snapshot.val();
        if (notificationObj) {
          for (const property in notificationObj) {
            if (notificationObj.hasOwnProperty(property)) {
              if (property === "band") {
                this.setState({
                  band: notificationObj[property],
                });
                console.log("band " + this.state.band);
              }
            }
          }
        }
      });
    this.props.firebase.band(this.state.band).once("value", (snapshot) => {
      const bandObj = snapshot.val();
      this.setState({
        bandName: bandObj.name,
      });
    });
  };
  */

  opportunityStatus = (user, notification) => {
    this.props.firebase
      .notification(user, notification)
      .once("value", (snapshot) => {
        const notificationObj = snapshot.val();
        if (notificationObj) {
          for (const property in notificationObj) {
            if (notificationObj.hasOwnProperty(property)) {
              if (property === "opportunity") {
                this.setState({
                  opportunity: notificationObj[property],
                });
                console.log("opportunity " + this.state.opportunity);
              } else if (property === "statusMessage") {
                this.setState({
                  statusMessage: notificationObj[property],
                });
                console.log("statusMessage " + this.state.statusMessage);
              }
            }
          }
        }
      });
    this.props.firebase
      .opportunity(this.state.band)
      .once("value", (snapshot) => {
        const oppObj = snapshot.val();
        this.setState({
          opportunityTitle: oppObj.title,
        });
      });
  };

  bandMemberNotification = (user, notification) => {
    this.props.firebase
      .notification(user, notification)
      .once("value", (snapshot) => {
        const notificationObj = snapshot.val();
        if (notificationObj) {
          for (const property in notificationObj) {
            if (notificationObj.hasOwnProperty(property)) {
              console.log("band: " + notificationObj[property] )
               if (property  === "band") {
                this.setState({
                  band: notificationObj[property],
                })
              }
            }
          }
        }
      });
      console.log("baaaaand " + this.state.band)

      this.props.firebase.band(this.state.band).once("value", (snapshot) => {
        const bandObj = snapshot.val();
        console.log("baaand " + bandObj.name)
        if (bandObj) {
          for (const property in bandObj) {
            if (bandObj.hasOwnProperty(property)) {
              if (property === "name") {
                console.log("band name " + bandObj[property])
                this.setState({
                  bandName: bandObj[property],
                })
              }
            }
          }
        }
      });
  };

  componentWillUnmount() {
    const notificationId = this.props.match.params.id;
    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const currentUser = this.props.firebase.auth.currentUser;
        const currentUserId = currentUser.uid;

        this.props.firebase.notification(notificationId).off();
      }
    });
  }

  render() {
    const { authUser } = this.props;
    const {
      type,
      loading,
      createdAt,
      statusMessage,
      opportunity,
      bandApplicant,
      band,
      senderId,
      user,
      username,
      bandName,
      opportunityTitle,
    } = this.state;

    return (
      <div>
        {loading && <div> Loading...</div>}
        <ul>{type}</ul>
        <ul>Notification sent at: {createdAt}</ul>

        {type === "Accepted Connection Request" && (
          <div>
            <ul>User:</ul>

            <Link
              to={{
                pathname: `${ROUTES.USERS}/${user}`,
              }}
            >
              {username}
            </Link>
          </div>
        )}

        {type === "Declined Connection Request" && (
          <div>
            <ul>User:</ul>

            <Link
              to={{
                pathname: `${ROUTES.USERS}/${user}`,
              }}
            >
              {username}
            </Link>
          </div>
        )}

{/* {type === "Band Member Request" && (
          <div>
            <ul>Band:</ul>

            <Link
              to={{
                pathname: `${ROUTES.BANDS}/${band}`,
              }}
            >
              {bandName}
            </Link>
          </div>
        )}*/}
        

        {type === "Connection Request Received" && (
          <div>
            <ul>Sender:</ul>

            <Link
              to={{
                pathname: `${ROUTES.USERS}/${senderId}`,
              }}
            >
              {username}
            </Link>
          </div>
        )}

        {type === "Opportunity Status Notification" && (
          <div>
            <ul>Opportunity:</ul>

            <Link
              to={{
                pathname: `${ROUTES.OPPORTUNITIES}/${opportunity}`,
              }}
            >
              {opportunityTitle}
            </Link>
            <ul>Status Message: {statusMessage}</ul>
          </div>
        )}

        {type === "Approved Band Member" && (
          <div>
            <Link
              to={{
                pathname: `${ROUTES.BANDS}/${band}`,
              }}
            >
              {bandName}
            </Link>
          </div>
        )}

        {type === "Declined Band Member" && (
          <div>
          <ul>Band: {bandName} :</ul>

        </div>
        )}
      </div>
    );
  }
}

export default withFirebase(NotificationProfile);
