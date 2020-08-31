import { StyleSheet} from "react-native-web";


const page_styles = StyleSheet.create({
  whole_page: {
    marginRight: "20%",
    marginLeft: "20%"
  },
  text_container: {
    padding: "5%"
  },
  header: {
    color: "black",
    fontSize: "22px",
    fontFamily: "monospace",
      
  },
  normal_text: {
    color: "black",
fontSize: "14px",
fontFamily: "monospace",
  }
});

export default page_styles;

/*
    whole_page: {
      padding: 10,
      flexDirection: 'column',
    },
    text_h1: {
      fontWeight: 'bold',
      fontSize: 40,
      textAlign: "center",
    },
    text_h2: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    text_h3: {
        fontSize: 20,
      },
    save_button: {
      height: 30,
      length: 30,
    },
    top_section: {
        flex: 1,
        flexDirection: 'row',
    },
    middle_right_section: {
      flex: 1,
      flexDirection: 'row',
  },
  middle_left_section: {
    flex: 1,
    flexDirection: 'row',
},
     */