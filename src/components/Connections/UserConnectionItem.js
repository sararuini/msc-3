import React, { Component } from "react";

import { Link } from "react-router-dom";

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

  retrieveUsername = () => {
    const thisConnection = this.props.connection.uid;
    console.log("thisConnection " + thisConnection)
    this.props.firebase.connection(thisConnection).once("value", (snapshot) => {
      const connectionObj = snapshot.val();
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
              {connectionUsername}
            </Link>
            <button onClick={() => deleteConnection(connection.uid)}>
              {" "}
              Delete Connection
            </button>
          </span>
        )}
      </div>
    );
  }
}

export default withFirebase(UserConnectionItem);
