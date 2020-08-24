import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

class PostItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editText: this.props.post.text,
      username: "",
      connection: "",
      canShowPost: false,
    };
  }

  componentDidMount() {
    const postId = this.props.post.uid;
    const creator = this.props.postCreator
    const user = this.props.firebase.auth.currentUser
    const userId = user.uid;

    this.props.firebase.userConnections(userId)
      .once("value", (snapshot) => {
        const userConnObj = snapshot.val();

        if (userConnObj){
          for (const property in userConnObj){
            if (userConnObj.hasOwnProperty(property)) {
              console.log(userConnObj[property])

              const connectionObject = userConnObj[property].user
              console.log("uuuser " + connectionObject)
              
              this.setState({ connection: connectionObject })
            }
            if (creator ===  this.state.connection || creator === userId){
              this.setState({
                canShowPost: true
              })
              console.log("creeator " + creator)
              console.log("state " + this.state.canShowPost)
            } 
          }
        } else {
          if (creator === userId){
            this.setState({
              canShowPost: true
            })
            console.log("creeator " + creator)
            console.log("state " + this.state.canShowPost)
          } 
        }
        
    })    
     
    
    /*
    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log("start")
        const currentUser = this.props.firebase.auth.currentUser;
        const currentUserId = currentUser.uid;

        this.props.firebase
          .userConnections(currentUserId)
          .on("value", (snapshot) => {
            const userConnObj = snapshot.val();

            if (userConnObj) {
              for (const id in userConnObj) {
                if (userConnObj.hasOwnProperty(id)) {
                  this.props.firebase.connection(id).once("value", (snap) => {
                    const connectionObj = snap.val();

                    if (connectionObj) {
                      for (const property in connectionObj) {
                        if (connectionObj.hasOwnProperty(property)) {
                          if (property === "userA" || property === "userB") {
                            if (connectionObj[property] !== currentUserId) {
                              console.log(
                                property + " proppp " + connectionObj[property]
                              );
                              console.log("current user id " + currentUserId);
                              const conn = connectionObj[property];
                              this.setState({
                                connection: conn,
                              });
                              console.log(
                                "this state loading connections " +
                                  this.state.connection
                              );

                              this.props.firebase
                                .post(postId)
                                .on("value", (snapshot) => {
                                  const postObj = snapshot.val();
                                  this.setState({
                                    userId: postObj.userId,
                                  });
                                  console.log("pooost uuuuser id " + userId);
                                  console.log("poost " + postObj.text);
                                  console.log(
                                    "connection " + this.state.connection
                                  );
                                  if (
                                    this.state.connection === postObj.userId
                                  ) {
                                    console.log("friend");
                                    this.setState({ canShowPost: true });
                                    console.log(
                                      "state connection post " +
                                        this.state.canShowPost
                                    );
                                  } else if (postObj.userId === currentUserId) {
                                    console.log("seelf");
                                    this.setState({ canShowPost: true });
                                    console.log(
                                      "state connection post " +
                                        this.state.canShowPost
                                    );
                                  } else {
                                    console.log("not friend");
                                    this.setState({ canShowPost: false });
                                    console.log(
                                      "state connection post " +
                                        this.state.canShowPost
                                    );
                                  }
                                });

                              if (this.state.canShowPost === true) {
                                this.props.firebase
                                  .user(userId)
                                  .on("value", (snshot) => {
                                    const userObj = snshot.val();

                                    this.setState({
                                      username: userObj.username,
                                    });
                                  });
                              }
                            }
                          }
                        }
                      }
                    }
                  });
                }
              }
            } else {
              this.props.firebase.post(postId).on("value", (snapshot) => {
                const postObj = snapshot.val();
                if (postObj) {
                  this.setState({
                    userId: postObj.userId,
                  });
                  if (postObj.userId === currentUserId) {
                    console.log("seelf");
                    this.setState({ canShowPost: true });
                    console.log(
                      "state connection post " + this.state.canShowPost
                    );
                  }
                } 
              });
            }
            
          });
          console.log("finish")
      }
    });

    */
  }

  onToggleEditMode = () => {
    this.setState((state) => ({
      editMode: !state.editMode,
      editText: this.props.post.text,
    }));
  };

  onChangeEditText = (event) => {
    this.setState({ editText: event.target.value });
  };

  onSaveEditText = () => {
    this.props.onEditPost(this.props.post, this.state.editText);

    this.setState({ editMode: false });
  };

  render() {
    const { authUser, post, onRemovePost, postCreator} = this.props;
    const { editMode, editText, username, canShowPost } = this.state;

    return (
      <div>
        {authUser && canShowPost && (
          <div>
            {editMode && (
              <input
                type="text"
                value={editText}
                onChange={this.onChangeEditText}
              />
            )}

            {!editMode && (
              <span>
                <Link
                  to={{
                    pathname: `${ROUTES.USERS}/${post.userId}`,
                  }}
                >
                  {username} {postCreator}
                </Link>
                {post.text}
                {post.editedAt && <span>(Edited)</span>}
              </span>
            )}
            {authUser.uid === post.userId && (
              <span>
                {editMode ? (
                  <span>
                    <button onClick={this.onSaveEditText}>Save</button>
                    <button onClick={this.onToggleEditMode}>Reset</button>
                  </span>
                ) : (
                  <button onClick={this.onToggleEditMode}>Edit</button>
                )}

                {!editMode && (
                  <button type="button" onClick={() => onRemovePost(post.uid)}>
                    Delete
                  </button>
                )}
              </span>
            )}
          </div>
        )}
        
          
        
      </div>
    );
  }
}

export default withFirebase(PostItem);
