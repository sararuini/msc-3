import { StyleSheet} from "react-native-web";

{/* Resources used:
    https://stackoverflow.com/questions/29447715/react-native-fixed-footer
 */}

const footbar_styles = StyleSheet.create({
    footer: {
        backgroundColor: "black",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    right: "0",
    height: "100px",
    width: "100%",
    },
  text_container: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  all_text: {
    color: "#ffffff",
    fontFamily: "sans-serif",
    padding: 3,
  },
  column: {
    flexDirection: "column",
    alignItems: "stretch",
  },
});

export default footbar_styles;