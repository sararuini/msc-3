import { StyleSheet } from "react-native-web";

const opportunityStyle = StyleSheet.create({
  /*
  main: {
      margin: "1px solid black",
      padding: "10px",
      backgroundColor: "purple",
      border: "1px solid white"
  },
  */
  normal_text: {
    color: "black",
    fontSize: "14px",
    fontFamily: "monospace",
    marginLeft: "1%",
  },
  list_opps: {
    marginBottom: "1%",
    marginTop: "1%"
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
    marginRight: "10%",
    marginLeft: "10%",
    flexDirection: "row",
    flexWrap: "wrap",
    //justifyContent:"space-evenly",
    alignItems:  "center",
    flex: 1
  },
  main_opps_av: {
    marginRight: "10%",
    marginLeft: "10%",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
    paddingBottom: "10%",
    paddingLeft: "10%",
    paddingRight: "10%",
    paddingTop: "3%"
  },

  opportunity_create_container: {
    flexDirection: "column",
    //flex: 1,
    justifyContent: "space-between",
    alignItems:  "center",
    width: "50%",
  },
  row_opps: {
    flexDirection: "column",
    //flex: 2,
    //justifyContent:"space-around",
    //alignItems:  "center",
    //paddingTop: "17%",
    //paddingBottom: "17%",
    alignItems: "center",
    width: "50%",
    height: "100%",
  }, 
  available_opp: {
    flex: 1,
  },
  saved_opp: {
    flex: 2,

    marginTop: "4%"
  },
  published_opp: {
    flex: 3,

    marginTop: "4%"
  },
  applied_opp: {
    flex: 4,

    marginTop: "4%"
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
