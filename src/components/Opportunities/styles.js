import { StyleSheet } from "react-native-web";

const opportunityStyle = StyleSheet.create({
  main: {
      margin: "1px solid black",
      padding: "10px",
      backgroundColor: "purple",
      border: "1px solid white"
  },
  normal_text: {
    color: "black",
    fontSize: "14px",
    fontFamily: "monospace",
    marginLeft: "1%",
  },
  header: {
    color: "black",
    fontSize: "22px",
    fontFamily: "monospace",
    marginBottom: "2%",
    marginTop: "2%",
    marginLeft: "2%"
  },
  whole_page: {
    marginRight: "20%",
    marginLeft: "20%",
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
  align_icon: {
    flexDirection: "row",
    alignItems: "center",
  },
  text_input: {
    backgroundColor: "white",
    opacity: "0.9",
    color: "black",
    alignItems: "center",
    marginBottom: "1%",
    marginTop: "1%",
  },
});

export default opportunityStyle;
