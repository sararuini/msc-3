import React from "react";

import { Link } from "react-router-dom";

import { View, Text, ScrollView } from "react-native-web";
import page_styles from "./styles";
import * as ROUTES from "../../constants/routes";

const Footbar = () => (

    <View style={page_styles.footer}>
        <View style={page_styles.text_container}>

            <View style={[page_styles.column, {float: "left", textAlign: "center",}]}>
            <Text style={[page_styles.all_text, {flex: 1, fontSize:16}]}>
        {" "}
        <strong>Music Connector</strong> © 2020 by <strong>Sara Ruini</strong> 
      </Text>
      <Text style={[page_styles.all_text,{flex: 2, fontSize:16}]}>
        <strong> Email:</strong> s.ruini@se18.qmul.ac.uk
      </Text>
        </View>
      


      <View style={[page_styles.column, {float: "right", textAlign: "left",}]}>
              <Text style={[page_styles.all_text, {flex: 1, fontSize:14}]}><strong>About</strong></Text>
        <Text style={[page_styles.all_text, {flex: 2, fontSize:14}]}><strong>Privacy Policy</strong></Text>
        <Text style={[page_styles.all_text, {flex: 3, fontSize:14}]}><strong>Contact Music Connector</strong></Text>
      </View>
        </View>
        
    </View>
);

export default Footbar;
