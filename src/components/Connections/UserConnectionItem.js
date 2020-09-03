import React, { Component } from "react";

import { Link } from "react-router-dom";
import connectionStyle from "./styles";
import { View, Text } from "react-native-web";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

class UserConnectionItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      connectionUsername: "",
    };
  }

  componentDidMount = () => {
    this.setState({loading: true})
    this.retrieveUsername()
    this.setState({loading: false})
  }

  componentWillUnmount() {
    const conn = this.props.connection.uid;
    this.props.firebase.connection(conn).off()
  }


  retrieveUsername = () => {
    const thisConnection = this.props.connection.uid;
    console.log("thisConnection " + thisConnection)
    this.props.firebase.connection(thisConnection).once("value", (snapshot) => {
      const connectionObj = snapshot.val();
      if (connectionObj) {
        const userA = connectionObj.userA;
      const userB = connectionObj.userB;
      let selectedUser = "";

      if (this.props.firebase.auth.currentUser.uid === userA) {
        selectedUser = userB;
      } else if (this.props.firebase.auth.currentUser.uid === userB) {
        selectedUser = userA;
      }
      console.log("selected" + selectedUser)
      this.props.firebase.user(selectedUser).on("value", (snapshot) => {
        const userUsername = snapshot.val().username;
        console.log("userUserna " + userUsername)
        this.setState({ connectionUsername: userUsername });
      });
      }
      
    });
  };
  render() {
    const {
      authUser,
      connection,
      deleteConnection,
    } = this.props;
    
    const 
    {connectionUsername} = this.state;
    return (
      <div>
        {authUser && (
          <span>
            <Link
              to={{
                pathname: `${ROUTES.USERS}/${connection.user}`,
                //state: { user },
              }}
            >
              <Text style={connectionStyle.normal_text}>

              
              {connectionUsername}
              </Text>
            </Link>
            <button onClick={() => deleteConnection(connection.uid)}>
            <Text style={connectionStyle.normal_text}>
              Delete Connection </Text>
            </button>
          </span>
        )}
      </div>
    );
  }
}

export default withFirebase(UserConnectionItem);
