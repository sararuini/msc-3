import { StyleSheet } from "react-native-web";

{
  /* Resources used:
    https://stackoverflow.com/questions/29447715/react-native-fixed-footer
 */
}

const footbar_styles = StyleSheet.create({
  footer: {
    backgroundColor: "black",
    //borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    left: "0",
    right: "0",
    position: "relative",
    left: 0,
    bottom: 0,
    width: "100%",
    height: "10vh",
    width: "100%",
    padding: "5px"
  },
  text_container: {
    padding: "10px",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems:"center"
  },
  all_text: {
    color: "#ffffff",
    fontFamily: "monospace",
    padding: 3,
  },
  column: {
    flexDirection: "column",
    alignItems: "stretch",
  },
});

export default footbar_styles;
