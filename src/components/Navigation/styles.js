
import { StyleSheet} from "react-native-web";

const page_styles = StyleSheet.create({

    top_container: {
        flex:1,
        flexDirection: "row",
        backgroundColor: "white",
        alignItems: "stretch",
        padding: "10px"
        
    },
    menu_links: {
        flexDirection: "row",
        flexWrap: "wrap",

    },
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
    
    navbar_container:{
        flex: 1,
        backgroundColor: "white",
        flexDirection: "row",
    },
    */
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
    text_container: {
        padding: 5,
        flexDirection: "column",
        justifyContent: "space-around",
        color: "black",
    },
    all_text: {
        color: "#ffffff",
        fontFamily: "sans-serif",
        padding: 3,
        fontSize:16,
    }
    
});

export default page_styles;
