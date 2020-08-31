import { StyleSheet} from "react-native-web";

const page_styles = StyleSheet.create({
    menu_links: {
        flexDirection: "row",
        width: "100%",
        height: "10%",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        alignItems: "center",
        alignSelf: "center"
    },   
    align_icon: {
        flexDirection: "row",
        alignItems: "center",
      }
});

export default page_styles;

/*
    navigation: {
        position: "absolute",
        float: "left",
        top: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        backgroundColor: "#fbfaff",
        flex: 1,
        flexDirection: "row",
        alignItems :"stretch",
        alignContent: "center",
        width: "15%",
        color: "black",
        height: "100%",
    },
     all_text: {
        color: "#ffffff",
        fontFamily: "sans-serif",
        padding: 3,
        fontSize:16,
    },
    icon: {
        flexDirection: "row",
        backgroundColor: "blue",
        alignItems: "center",
        alignCenter: "flex-start",
        justifyContent:"flex-start",
    },
     text_container: {
        padding: 5,
        flexDirection: "column",
        justifyContent: "space-around",
        color: "black",
    },
    top_container: {
        flex:1,
        backgroundColor: "white",
        padding: "10px",
        border: "1px solid black",
        alignSelf: "flex-start",
    },
    
    navbar_container:{
        flex: 1,
        backgroundColor: "white",
        flexDirection: "row",
    },
    
    right_menu: {
        position: "absolute",
        float: "left",
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#fbfaff",
        flex: 1,
        flexDirection: "column",
        width: "15%",
        color: "black",
    },
    */