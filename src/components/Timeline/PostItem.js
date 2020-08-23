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
    };
  }
  componentDidMount() {
    const postId = this.props.post.uid;
    const userId = this.props.post.userId

    this.props.firebase.user(userId).once("value", (snapshot) => {
      const userObj = snapshot.val();
      this.setState({
        username: userObj.username,
      })
    });
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
    const { authUser, post, onRemovePost } = this.props;
    const { editMode, editText, username} = this.state;

    return (
      <li>
        {editMode ? (
          <input
            type="text"
            value={editText}
            onChange={this.onChangeEditText}
          />
        ) : (
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
      </li>
    );
  }
}

export default withFirebase(PostItem);
