import { StyleSheet} from "react-native-web";

{/* Resources used:
    https://stackoverflow.com/questions/29447715/react-native-fixed-footer
 */}

const page_styles = StyleSheet.create({
    footer: {
        backgroundColor: "#000000",
        position:"absolute",
        float: "bottom",
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
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
    column:{
        flexDirection: "column",
        alignItems: "stretch"
    }
});

export default page_styles;