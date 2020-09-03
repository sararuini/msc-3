import { StyleSheet } from "react-native-web";

const page_styles = StyleSheet.create({
  whole_page: {
    marginRight: "20%",
    marginLeft: "20%",
    display: "block"
  },
  button_container: {

  },
  text_container: {
    padding: "5%",
  },
  header: {
    color: "black",
    fontSize: "22px",
    fontFamily: "monospace",
    marginBottom: "2%",
    marginTop: "2%",
  },
  normal_text: {
    color: "black",
    fontSize: "14px",
    fontFamily: "monospace",
    marginLeft: "1%",
  },
  checkbox_text: {
    color: "black",
    fontSize: "14px",
    fontFamily: "monospace",
  },
  view_space: {
    marginBottom: "3%",
  },
  text_input: {
    backgroundColor: "white",
    opacity: "0.9",
    color: "black",
    alignItems: "center",
    marginBottom: "1%",
    marginTop: "1%",
  },
  align_icon: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "black",
    fontSize: "32px",
    fontFamily: "monospace",
  },
  item_create: {
    width: "100%"
  }

});

export default page_styles;