import React, { Component } from "react";

import { AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";
import ConnectionRequestList from "./ConnectionRequestList";

class ConnectionRequests extends Component {
  constructor(props) {
    super(props);

    this.state = {
      connectionRequests: [],
      limit: 5,
    };
  }

  listenForConnectionRequests = () => {
      this.setState({ loading: true });
      const sender = this.props.firebase.auth.currentUser;
      const senderId = sender.uid;

    this.props.firebase
      .userPendingConnections(senderId)
      .limitToLast(this.state.limit)
      .on("value", (snapshot) => {
        const requestObject = snapshot.val();

        if (requestObject) {
          const connectionRequestList = Object.keys(requestObject).map((key) => ({
            ...requestObject[key],
            uid: key,
          }));

          this.setState({
            connectionRequests: connectionRequestList,
            loading: false,
          });
        } else {
          this.setState({ connectionRequests: null, loading: false });
        }
      });
  }

  componentDidMount = () => {
    this.listenForConnectionRequests();
  };
  /*
  componentWillUnmount() {
    this.props.firebase.connectionRequests().off();
  }


  acceptConnectionRequest = (authUser) => {
    const userId = authUser.uid;

    const friendshipCreated = this.props.firebase
      .userConnections(userId).push({
        receiverId: true,
        createdAt: this.props.firebase.serverValue.TIMESTAMP,
      })
  }
  
  declineConnectionRequest = () => {
    this.props.firebase.connectionRequestsUsers(uid).remove();
  }
  */

  onNextPage = () => {
    this.setState(
      (state) => ({ limit: state.limit + 5 }),
      this.listenForConnectionRequests,
    );
  };

  render() {
    const {
      connectionRequests,
      loading,
    } = this.state;

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div>
            {!loading && connectionRequests && (
              <button type="button" onClick={this.onNextPage}>
                More
              </button>
            )}

            {loading && <div>Loading ...</div>}

            {connectionRequests && (
              <ConnectionRequestList
                authUser={authUser}
                connectionRequests={connectionRequests}
                //acceptConnectionRequest={this.acceptConnectionRequest}
                //declineConnectionRequest={this.declineConnectionRequest}
              />
            )}

            {!connectionRequests && <div>There are no pending connection requests ...</div>}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(ConnectionRequests);
