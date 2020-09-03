import { StyleSheet } from "react-native-web";

const postStyle = StyleSheet.create({
  postItem: {
      alignItems: "stretch",
  },
  posts: {
      padding: "2%",
  },
  postComments: {
      //border: "1px solid green",
      justifyContent: "flex-start",

  },
  post_item_comment:{
    justifyContent: "flex-start"
  },
  createPost: {
      flexDirection: "column",
      alignSelf: "stretch",
      alignItems: "center"
  },
  header: {
    color: "black",
    fontSize: "20px",
    fontFamily: "monospace",
    marginBottom: "2%",
    marginTop: "2%",
    //alignSef: "center"
  },
  button_container: {
      flexDirection: "row",
      justifyContent: "flex-start",
      
  },
  userHeader: {
    color: "black",
    fontSize: "22px",
    fontFamily: "monospace",
    marginBottom: "2%",
    marginTop: "2%",
    fontWeight: "bold",
  },
  postContainer: {
    display: "flex",
    //alignItems: "stretch",
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  posts: {
      alignItems: "stretch"
  },
  normal_text: {
    color: "black",
    fontSize: "14px",
    fontFamily: "monospace",
    marginLeft: "1%",
    //alignSelf: "center"
  },
  post_text: {
    color: "black",
    fontSize: "18px",
    fontFamily: "monospace",
    padding: "1%"
  },

  text_input: {
    backgroundColor: "white",
    opacity: "0.9",
    color: "black",
    marginBottom: "2%",
    marginTop: "1%",
    marginRight: "1%"
  },
  button_container: {

  }
});

export default postStyle;
