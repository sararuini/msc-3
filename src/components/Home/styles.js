import { StyleSheet } from "react-native-web";

const homeStyle = StyleSheet.create({
  
  whole_page: {
    marginRight: "10%",
    marginLeft: "10%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "stretch"
  },
  header: {
    color: "black",
    fontSize: "26px",
    fontFamily: "monospace",
    marginBottom: "2%",
    marginTop: "2%",
    alignSelf: "center"
  },
  comment_list_post_item: {
    flexDirection: "column",
    justifyContent: "center",
  },
  normal_text: {
    color: "black",
    fontSize: "14px",
    fontFamily: "monospace",
    marginLeft: "1%",
  },
});

export default homeStyle;
