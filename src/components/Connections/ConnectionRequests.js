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
      loading: false,
    };
  }
  /*
  listenForConnectionRequests = () => {
    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if(authUser) {
      this.setState({ loading: true });
      const currentUser = this.props.firebase.auth.currentUser;
      const currentUserId = currentUser.uid;
        
      this.props.firebase.
      pendingConnections()
      .limitToLast(this.state.limit)
      .on("value", (snapshot) => {
        const requestObject = snapshot.val();
        if (requestObject) {
          console.log(requestObject)
        }
      })
      }  
    })
  }
  */

  listenForConnectionRequests = () => {
    this.setState({ loading: true });

    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if(authUser) {
      const currentUser = this.props.firebase.auth.currentUser;
      const currentUserId = currentUser.uid;
    
      this.props.firebase
      .pendingConnections()
      .orderByChild('createdAt')
      .limitToLast(this.state.limit)
      .on("value", (snapshot) => {
        const requestObject = snapshot.val();

        if (requestObject) {
          console.log(requestObject)
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
    })
}

  componentDidMount = () => {
    this.listenForConnectionRequests();
  };

/*
  componentWillUnmount() {
    this.props.firebase.connectionRequests().off();
  }
*/
    
  acceptConnectionRequest = () => {
    console.log("accept")
    /*
    const receiverId = ""
    const senderId = ""

    this.props.firebase.pendingConnection(uid).once("value").then((snapshot)=> {
      const obj = snapshot.val();

      receiverId = obj.receiverId
      senderId = obj.senderId
    })

    console.log("accept 1")
    const ref = this.props.firebase.userConnections().push()
    const keyRef = ref.key

    ref.set({
        user1: receiverId,
        user2: senderId,
        createdAt: this.props.firebase.serverValue.TIMESTAMP,
      })
    */
  }
 
  declineConnectionRequest = uid => {
    console.log("uid " + uid)
    this.props.firebase.pendingConnection(uid).remove();
  }

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
            {loading && <div>Loading ...</div>}

            {connectionRequests && (
              <ConnectionRequestList
                authUser={authUser}
                connectionRequests={connectionRequests}
                acceptConnectionRequest={this.acceptConnectionRequest}
                declineConnectionRequest={this.declineConnectionRequest}
              />
            )}

{!loading && connectionRequests && (
              <button type="button" onClick={this.onNextPage}>
                More
              </button>
            )}

            {!connectionRequests && <div>There are no pending connection requests ...</div>}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(ConnectionRequests);
