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
  whole_app: {
    //display: "flex",
    //flexDirections: "column",
    //alignContent: "flex-start",
    //flexWrap: "wrap",
    //flex: 1
  },
  scrollable_container: {
    //alignItems: "center",
    //justifyContent: "cener",
    color: "black",
    backgroundColor: "white",
    padding: "20px",
    width: "100%",
    padding: "10px",
    backgroundColor: "pink",
  },

  footbar: {
    display: "block",
    position: "absolute",
    flex: 1,

  },
  topbar: {
    position: "fixed",
    margin: "1px solid black",
    backgroundColor: "green"
  },
});

export default page_styles_template;
