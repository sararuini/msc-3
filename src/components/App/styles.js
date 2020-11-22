import { StyleSheet } from "react-native-web";

const page_styles_template = StyleSheet.create({
 
  scrollable_container: {
    color: "black",
    padding: "20%",
    width: "100%",
    height: "80vh",
    maxHeight: "95%",
    padding: "10px",
    backgroundColor: "white",
    overflow: "auto",
    margin: 0,
  },
  footbar: {
    backgroundColor: "black",
    overflow:"hidden" ,
    position: "fixed",
    bottom: "0",
    height: "10%",
    width: "100%",
  },

  //https://www.w3schools.com/howto/howto_css_bottom_nav.asp Resource used for footbar
  /* 
  footbar: {
    display: "block",
    position: "absolute",
    flex: 0.1,
    bottom: 0,
    height: "15%",
    width: "100%",
  },
  */
  topbar: {
    position: "fixed",
    margin: "1px solid black",
    backgroundColor: "white",
  },
});

export default page_styles_template;
