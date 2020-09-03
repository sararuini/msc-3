import React, { Component } from "react";

import { AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";
import PostList from "./PostList";
import postStyle from "./styles";
import { View, Text, TextInput } from "react-native-web";

class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      loading: false,
      posts: [],
      limit: 5,
    };
  }

  componentDidMount() {
    this.onListenForPosts();
  }

  onListenForPosts = () => {
    this.setState({ loading: true });

    this.props.firebase
      .posts()
      .orderByChild("createdAt")
      .limitToLast(this.state.limit)
      .on("value", (snapshot) => {
        const postObject = snapshot.val();

        if (postObject) {
          const postList = Object.keys(postObject).map((key) => ({
            ...postObject[key],
            uid: key,
          }));

          this.setState({
            posts: postList,
            loading: false,
          });
        } else {
          this.setState({ posts: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.props.firebase.posts().off();
  }

  onChangeText = (event) => {
    this.setState({ text: event.target.value });
  };

  onCreatePost = (event, authUser) => {
    const ref = this.props.firebase.posts().push();
    const refKey = ref.key;
    const userId = authUser.uid;

    ref.set({
      text: this.state.text,
      userId: userId,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.props.firebase.userPosts(userId).set({
      [refKey]: "posted",
    });

    this.setState({ text: "" });

    event.preventDefault();
  };

  onEditPost = (post, text) => {
    const { uid, ...postSnapshot } = post;

    this.props.firebase.post(post.uid).set({
      ...postSnapshot,
      text,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  onRemovePost = (uid) => {
    this.props.firebase.post(uid).remove();
  };

  onNextPage = () => {
    this.setState(
      (state) => ({ limit: state.limit + 5 }),
      this.onListenForPosts
    );
  };

  render() {
    const { text, posts, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div>
            <View style={postStyle.postContainer}>
              <View style={postStyle.createPost}>
                <form onSubmit={(event) => this.onCreatePost(event, authUser)}>
                  <View>
                    <TextInput
                      style={postStyle.text_input}
                      placeholder="What are you thinking?"
                      value={text}
                      nativeID="text"
                      blurOnSubmit="false"
                      onChangeText={(text) => this.setState({ text })}
                    />
                  </View>
                  <View>
                    <button type="submit">
                      <Text style={postStyle.normal_text}>
                        Share a post with your connections
                      </Text>
                    </button>
                  </View>
                </form>
              </View>

              {loading && (<Text style={{color: "black",
    fontSize: "14px",
    fontFamily: "monospace",}}>Loading...</Text>)
              }

              {posts && (
                <View style={postStyle.posts}>

                <PostList
                  authUser={authUser}
                  posts={posts}
                  onEditPost={this.onEditPost}
                  onRemovePost={this.onRemovePost}
                />
                </View>
              )}

              {!loading && posts && (
                <button type="button" onClick={this.onNextPage}>
                  <Text
                    style={{
                      color: "black",
                      fontSize: "14px",
                      fontFamily: "monospace",
                    }}
                  >
                    Show more posts
                  </Text>
                </button>
              )}

              {!posts && (
                <Text
                  style={{
                    color: "black",
                    fontSize: "14px",
                    fontFamily: "monospace",
                  }}
                >
                  There are no posts ...
                </Text>
              )}
            </View>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Posts);
