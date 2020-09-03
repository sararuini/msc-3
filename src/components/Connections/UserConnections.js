import React, { Component } from "react";
import { withFirebase } from "../Firebase";

import { AuthUserContext } from "../Session";
import UserConnectionList from "./UserConnectionList";

import connectionStyle from "./styles";
import { View, Text } from "react-native-web";
class UserConnections extends Component {
  constructor(props) {
    super(props);

    this.state = {
      connections: [],
      connectionToRemove: "",
      limit: 10,
      loading: false,
    };
  }

  componentDidMount = () => {
    this.loadUserConnections();
  };

  componentWillUnmount = () => {
    this.props.firebase.connections().off();
  };

  deleteConnection = (uid) => {
    console.log("deletinnn");
    const currentUser = this.props.firebase.auth.currentUser;
    const currentUserId = currentUser.uid;
    this.props.firebase
      .userConnection(currentUserId, uid)
      .once("value", (snapshot) => {
        const friend = snapshot.val().user;
        this.setState({ connectionToRemove: friend });
        console.log(friend);
        console.log("uid" + uid);
        console.log(this.state.connectionToRemove);
        console.log("step 1");
        this.props.firebase.userConnection(currentUserId, uid).remove();
        console.log("step 2");
        this.props.firebase.userConnection(friend, uid).remove();
        console.log("step 3");
        this.props.firebase.connection(uid).remove();
      });
    console.log("deleted");
  };

  loadUserConnections = () => {
    this.setState({ loading: true });
    console.log("oh yeas they loadiiin");
    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const currentUser = this.props.firebase.auth.currentUser;
        const currentUserId = currentUser.uid;

        this.props.firebase
          .userConnections(currentUserId)
          .orderByChild("createdAt")
          .limitToLast(this.state.limit)
          .on("value", (snapshot) => {
            const connectionObj = snapshot.val();

            if (connectionObj) {
              console.log(connectionObj);
              const connectionList = Object.keys(connectionObj).map((key) => ({
                ...connectionObj[key],
                uid: key,
              }));

              this.setState({
                connections: connectionList,
                loading: false,
              });
            } else {
              this.setState({ connections: null, loading: false });
            }
          });
        console.log("loaded");
      }
    });
  };

  onNextPage = () => {
    this.setState(
      (state) => ({ limit: state.limit + 10 }),
      this.loadUserConnections
    );
  };

  render() {
    const { connections, loading } = this.state;
    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div>
            {loading && <Text style={connectionStyle.normal_text}>Loading ...</Text>}

            {connections && (
              <UserConnectionList
                authUser={authUser}
                connections={connections}
                deleteConnection={this.deleteConnection}
              />
            )}

            {!loading && connections && connections.length > 10 && (
              <button type="button" onClick={this.onNextPage}>
                <Text style={connectionStyle.normal_text}>

                
                View more connections
                </Text>
              </button>
            )}

            {!connections && <Text style={connectionStyle.normal_text}>You have no connections ...</Text>}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}
export default withFirebase(UserConnections);
