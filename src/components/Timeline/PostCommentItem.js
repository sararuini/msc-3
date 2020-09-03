import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import postStyle from "./styles";
import { View, Text } from "react-native-web";

class PostCommentItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      commentText: "",
      username: "",
    };
  }

  componentDidMount() {
    const postId = this.props.post;
    const commentId = this.props.comment.uid;
    const creator = this.props.comment.createdBy;

    this.props.firebase.comment(postId, commentId).once("value", (snapshot) => {
      const commentObj = snapshot.val();

      this.setState({
        commentText: commentObj.comment,
      });
    });

    console.log("commment text " + this.state.commentText);

    this.props.firebase.user(creator).once("value", (snapshot) => {
      const userObj = snapshot.val();

      this.setState({
        username: userObj.username,
      });
    });

    console.log(" cratorrr " + this.state.username);
  }

  componentWillUnmount() {
    const postId = this.props.post;
    const commentId = this.props.comment.uid;

    this.props.firebase.comment(postId, commentId).off();
  }

  render() {
    const { authUser, comment } = this.props;
    const { commentText, username } = this.state;

    return (
      <div>
        {authUser && (
          <ul>
            <View style={postStyle.post_item_comment}>
              <Text style={postStyle.normal_text}>
                <strong>Comment by:</strong>
              </Text>

              <Link
                to={{
                  pathname: `${ROUTES.USERS}/${comment.createdBy}`,
                }}
              >
                {" "}
                <Text style={postStyle.normal_text}>{username}</Text>
              </Link>
            
            <Text style={postStyle.normal_text}>{commentText}</Text>
          </View>
          </ul>
        )}
      </div>
    );
  }
}

export default withFirebase(PostCommentItem);
