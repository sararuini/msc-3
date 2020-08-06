
import { StyleSheet} from "react-native-web";

const page_styles = StyleSheet.create({
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