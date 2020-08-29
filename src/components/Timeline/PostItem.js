import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import PostCommentList from "./PostCommentList";
import { View } from "react-native-web";
import postStyle from "./styles";

class PostItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editText: this.props.post.text,
      username: "",
      connection: "",
      canShowPost: false,
      comment: "",
      comments: [],
    };
  }

  componentDidMount() {
    const postId = this.props.post.uid;
    const user = this.props.firebase.auth.currentUser;
    const userId = user.uid;
    const creator = this.props.post.userId;

    this.props.firebase.userConnections(userId).once("value", (snapshot) => {
      const userConnObj = snapshot.val();

      if (userConnObj) {
        for (const property in userConnObj) {
          if (userConnObj.hasOwnProperty(property)) {
            console.log(userConnObj[property]);

            const connectionObject = userConnObj[property].user;
            console.log("uuuser " + connectionObject);

            this.setState({ connection: connectionObject });
          }
          if (creator === this.state.connection || creator === userId) {
            this.setState({
              canShowPost: true,
            });
            console.log("creeator " + creator);
            console.log("state " + this.state.canShowPost);
          }
          if (this.state.canShowPost === true) {
            this.props.firebase.user(creator).on("value", (snshot) => {
              const userObj = snshot.val();

              this.setState({
                username: userObj.username,
              });
            });
          }
        }
      } else {
        if (creator === userId) {
          this.setState({
            canShowPost: true,
          });
          console.log("creeator " + creator);
          console.log("state " + this.state.canShowPost);
        }
      }
    });
    this.loadComments();
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

  writeComment = (uid) => {
    const user = this.props.firebase.auth.currentUser;
    const userId = user.uid;
    this.props.firebase.comments(uid).push({
      comment: this.state.comment,
      createdBy: userId,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  loadComments = () => {
    this.props.firebase
      .comments(this.props.post.uid)
      .orderByChild("createdAt")
      .once("value", (snapshot) => {
        const commentObj = snapshot.val();

        if (commentObj) {
          const commentList = Object.keys(commentObj).map((key) => ({
            ...commentObj[key],
            uid: key,
          }));

          this.setState({
            comments: commentList
          });
        } else {
          this.setState({ comments: null });
        }
      });
  };


  onChangeComment = (event) => {
    this.setState({ comment: event.target.value });
  };

  render() {
    const { authUser, post, onRemovePost } = this.props;
    const {
      editMode,
      editText,
      username,
      canShowPost,
      comment,
      comments,
    } = this.state;

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

            <View style={postStyle.postItem}>
              {!editMode && (
              <span>
                <div>
                  <Link
                    to={{
                      pathname: `${ROUTES.USERS}/${post.userId}`,
                    }}
                  >
                    {username}
                  </Link>
                </div>
                <div>{post.text}</div>

                {post.editedAt && <span>(Edited)</span>}
              </span>
            )}
            </View>

            

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

            <span> Comments: </span>
            <span>
              <form onSubmit={() => this.writeComment(post.uid)}>
                <input
                  type="text"
                  value={comment}
                  onChange={this.onChangeComment}
                />
                <button type="submit">Create a comment</button>
              </form>
            </span>

            {!comments && <div> This post has no comments </div>}

            {comments && (
              <PostCommentList
                authUser={authUser}
                comments={comments}
                post={post.uid}
              />
            )}  
          
          </div>
        )}
      </div>
    );
  }
}

export default withFirebase(PostItem);
