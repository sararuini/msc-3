import { StyleSheet } from "react-native-web";

const page_styles_template = StyleSheet.create({
  /*
    central_container: {
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 10,
            left: 10,
            right: 10,
            borderRadius: 10,
    },
    */
  scrollable_container: {
    color: "black",
    backgroundColor: "white",
    padding: "20%",
    width: "100%",
    height: "100%",
    maxHeight: "95%",
    padding: "10px",
    backgroundColor: "pink",
    overflow: "auto",
    margin: 0,
   
  },

  footbar: {
    display: "block",
    position: "absolute",
    flex: 0.1,
    bottom: 0,
    height: "15%",
    width: "100%",
  },
  topbar: {
    position: "fixed",
    margin: "1px solid black",
    backgroundColor: "white",
  },
});

export default page_styles_template;
