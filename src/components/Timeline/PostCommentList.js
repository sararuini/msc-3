import React from 'react';

import PostCommentItem from './PostCommentItem';

const PostCommentList = ({
  authUser,
  comments,
  post,
}) => (
  <ul>
    {comments.map(comment => (
      <PostCommentItem
        authUser={authUser}
        key={comment.uid}
        comment={comment}
        post={post}
      />
    ))}
  </ul>
);

export default PostCommentList;