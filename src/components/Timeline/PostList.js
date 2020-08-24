import React from 'react';

import PostItem from './PostItem';

const PostList = ({
  authUser,
  posts,
  onEditPost,
  onRemovePost,
}) => (
  <ul>
    {posts.map(post => (
      <PostItem
        authUser={authUser}
        key={post.uid}
        post={post}
        postCreator={post.userId}
        onEditPost={onEditPost}
        onRemovePost={onRemovePost}
      />
    ))}
  </ul>
);

export default PostList;