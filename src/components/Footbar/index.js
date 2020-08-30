import React from "react";

import { Link } from "react-router-dom";

import { View, Text } from "react-native-web";
import * as ROUTES from "../../constants/routes";
import footbar_styles from "./styles";

const Footbar = () => (
  <View style={footbar_styles.footer}>
    <View style={footbar_styles.text_container}>
      <View
        style={[footbar_styles.column, { float: "left", textAlign: "center",}]}
      >
        <Text style={[footbar_styles.all_text, { flex: 1, fontSize: 14 }]}>
          {" "}
          <strong>Music Connector</strong> © 2020 by <strong>Sara Ruini</strong>
        </Text>
        <Text style={[footbar_styles.all_text, { flex: 2, fontSize: 14 }]}>
          <strong> Email:</strong> s.ruini@se18.qmul.ac.uk
        </Text>
      </View>

      <View
        style={[footbar_styles.column, { float: "right", textAlign: "center",}]}
      >
        <Text style={[footbar_styles.all_text, { flex: 1, fontSize: 14 }]}>
          <strong>About</strong>
        </Text>
        <Text style={[footbar_styles.all_text, { flex: 2, fontSize: 14 }]}>
          <strong>Privacy Policy</strong>
        </Text>
        <Text style={[footbar_styles.all_text, { flex: 3, fontSize: 14 }]}>
          <strong>Contact Music Connector</strong>
        </Text>
      </View>
    </View>
  </View>
);

export default Footbar;
