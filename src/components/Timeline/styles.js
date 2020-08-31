import { StyleSheet } from "react-native-web";

const postStyle = StyleSheet.create({
  postItem: {
      margin: "1px solid black",
      margin: "2%",
      backgroundColor: "yellow",
      border: "1px solid blue",
      alignItems: "center"
  },
  posts: {
      padding: "10px",
      backgroundColor: "orange"
  },
  postComments: {
      border: "1px solid green"
  },
  createPost: {
      justifyContent: "center",
      backgroundColor: "orange"
  }
});

export default postStyle;
