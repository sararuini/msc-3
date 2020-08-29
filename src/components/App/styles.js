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
    display: "flex",
    flexDirections: "column",
  },
  central_block: {
    flex: 1,
  },

  scrollable_container: {
    alignItems: "center",
    justifyContent: "center",
    margin: 2,
    color: "black",
    backgroundColor: "white",
    padding: "20px",
    width: "100%",
    height: "100%",
  },

  footbar: {
    display: "block",
    width: "100%",

    position: "fixed",
    paddingBottom: "15%",
  },
  topbar: {
    position: "fixed",
    margin: "1px solid black"
  },
});

export default page_styles_template;
