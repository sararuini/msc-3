import React, { Component } from "react";

import { withFirebase } from "../Firebase";

import { Link } from "react-router-dom";
import Select from "react-select";

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
                          notificationId
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
  };

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
  };

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
  };

  bandMemberNotification = (user, notification) => {
    this.props.firebase
      .notification(user, notification)
      .once("value", (snapshot) => {
        const notificationObj = snapshot.val();
        if (notificationObj) {
          for (const property in notificationObj) {
            if (notificationObj.hasOwnProperty(property)) {
              if (property === "bandApplicant") {
                this.setState({
                  bandApplicant: notificationObj[property],
                });
                console.log("bandApplicant " + this.state.bandApplicant);
              }
            }
          }
        }
      });
  };

  /*
  componentWillUnmount (){
    const oppId = this.props.match.params.id;
    //this.props.firebase.notification(oppId).off();
  }
  */

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
    } = this.state;

    return (
      <div>
        {loading && <div> Loading...</div>}
        <ul>{type}</ul>
        <ul>Created At: {createdAt}</ul>

        {type === "Accepted Connection Request" && (
          <div>
            <ul>User: {user}</ul>
          </div>
        )}

        {type === "Declined Connection Request" && (
          <div>
            <ul>User: {user}</ul>
          </div>
        )}

        {type === "Band Member Request" && (
          <div>
            <ul>Band: {band}</ul>
          </div>
        )}

        {type === "Connection Request Received" && (
          <div>
            <ul>Sender: {senderId}</ul>
          </div>
        )}

        {type === "Opportunity Status Notification" && (
          <div>
            <ul>Opportunity: {opportunity}</ul>
            <ul>Status Message: {statusMessage}</ul>
          </div>
        )}

        {type === "Approved Band Member" && (
          <div>Band Applicant: {bandApplicant}</div>
        )}

        {type === "Declined Band Member" && (
          <div>Band Applicant: {bandApplicant}</div>
        )}
      </div>
    );
  }
}

export default withFirebase(NotificationProfile);
