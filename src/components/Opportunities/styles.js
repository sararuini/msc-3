import { StyleSheet } from "react-native-web";

const opportunityStyle = StyleSheet.create({
  
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
    fontSize: "16px",
    fontFamily: "monospace",
    marginBottom: "2%",
    marginTop: "2%",
    marginLeft: "2%",
    fontWeight: "bold"
  },
  whole_page: {
    marginRight: "10%",
    marginLeft: "10%",
    paddingTop: "2%",
    paddingBottom: "2%",
    flexDirection: "row",
    //height: "100%",
    flexWrap: "wrap",
    //justifyContent:"space-evenly",
    alignItems:  "center",
    flex: 1
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
