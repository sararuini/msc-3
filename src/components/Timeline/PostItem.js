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
            if (this.state.canShowPost === true) {
              this.props.firebase
                .user(creator)
                .on("value", (snshot) => {
                  const userObj = snshot.val();

                  this.setState({
                    username: userObj.username,
                  });
                });
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
                  {username}
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
