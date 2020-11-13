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
        onEditPost={onEditPost}
        onRemovePost={onRemovePost}
      />
    ))}
  </ul>
);

export default PostList;

{/* 
Sources: 
Used code template from book / code repo:
Wieruch, R. (2019) The road to React with Firebase.    
Wieruch, R. (2020) React-firebase-authentication. Available at: https://github.com/the-road-to-react-with-firebase/react-firebase-authentication (Accessed: 12 June 2020).
*/}