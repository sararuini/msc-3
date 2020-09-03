import React, { Component } from "react";

import { withFirebase } from "../Firebase";

import { Link } from "react-router-dom";

import notificationStyle from "./styles";
import { View, Text } from "react-native-web";
import * as ROUTES from "../../constants/routes";
let options = [];

class NotificationItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      type: "",
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.retrieveNotification();
    this.setState({ loading: false });
  }

  retrieveNotification = () => {
    const notification = this.props.notification.uid;
    const user = this.props.authUser.uid;
    console.log("usseeer " + user);

    console.log("notificationitem " + notification);

    this.props.firebase
      .notification(user, notification)
      .once("value", (snapshot) => {
        const notificationObj = snapshot.val();
        console.log("notification ooobj " + notificationObj);
        if (notificationObj) {
            for (const property in notificationObj){
                if (notificationObj.hasOwnProperty(property)) {
                    if (property === "type") {
                        console.log("property" + property)
                        console.log("obj" + notificationObj[property])
                        this.setState({
                            type: notificationObj[property]
                        })
                        console.log("state" + this.state.type)
                    }
                    
                }
            }
            
        }
      });
  };

  render() {
    const { authUser, notification } = this.props;
    const { loading, type } = this.state;

    return (
      <span>
        <ul>
          {" "}
          <Link
            to={{
              pathname: `${ROUTES.NOTIFICATIONS}/${notification.uid}`,
            }}
          >
            {" "}
           <Text style={notificationStyle.normal_text}> {type}</Text>
          </Link>
        </ul>
      </span>
    );
  }
}

export default withFirebase(NotificationItem);
