import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import PostCommentList from "./PostCommentList";
import { View, Text, TextInput } from "react-native-web";
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
            comments: commentList,
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
      <View>
        {authUser && canShowPost && (
          <View>
            {editMode && (
              <input
                type="text"
                value={editText}
                onChange={this.onChangeEditText}
              />
            )}

            <View style={postStyle.postItem}>
              {!editMode && (
                <View>
                  <View >
                    <Link
                      to={{
                        pathname: `${ROUTES.USERS}/${post.userId}`,
                      }}
                    >
                      <Text style={postStyle.userHeader}>{username}</Text>
                    </Link>
                  </View>
                  <View style={postStyle.post_text}>{post.text}</View>

                  {post.editedAt && (<Text style={postStyle.normal_text}>(Edited)</Text>)}
                </View>
              )}

              {authUser.uid === post.userId && (
                <View style={postStyle.button_container}>
                  {editMode ? (
                    <View>
                      <button onClick={this.onSaveEditText}><Text style={postStyle.normal_text}>Save</Text></button>
                      <button onClick={this.onToggleEditMode}><Text style={postStyle.normal_text}>Reset</Text></button>
                    </View>
                  ) : (
                    <View style={postStyle.button_container}>
                    <button onClick={this.onToggleEditMode}><Text style={postStyle.normal_text}>Edit</Text></button>
                    </View>
                  )}

                  {!editMode && (
                    <button
                      type="button"
                      onClick={() => onRemovePost(post.uid)}
                    >
                      <Text style={postStyle.normal_text}>
                        Delete
                      </Text>
                      
                    </button>
                  )}
                </View>
              )}
              
              <View style={postStyle.comment_list_post_item}>
              <Text style={postStyle.header}>Comments: </Text>
              
               <form onSubmit={() => this.writeComment(post.uid)}>
    
                  <TextInput
                      style={postStyle.text_input}
                      placeholder="Write a comment"
                      value={comment}
                      nativeID="comment"
                      blurOnSubmit="false"
                      onChangeText={(comment) => this.setState({ comment })}
                    />
                  <button type="submit"><Text style={postStyle.normal_text}>Leave a comment</Text></button>
                </form>
                </View>
                

              <View style={postStyle.postComments}>
                {!comments && (<Text style={postStyle.normal_text}>This post has no comments</Text>)}

                {comments && (
                  <View>

                  <PostCommentList
                    authUser={authUser}
                    comments={comments}
                    post={post.uid}
                  />
                  </View>
                )}
              </View>

            </View>
          </View>
        )}
      </View>
    );
  }
}

export default withFirebase(PostItem);
{/* 
Sources: 
Used code template from book / code repo:
Wieruch, R. (2019) The road to React with Firebase.    
Wieruch, R. (2020) React-firebase-authentication. Available at: https://github.com/the-road-to-react-with-firebase/react-firebase-authentication (Accessed: 12 June 2020).
*/}