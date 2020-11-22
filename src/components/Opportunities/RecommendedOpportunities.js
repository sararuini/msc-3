import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { AuthUserContext } from "../Session";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { View, Text, Image } from "react-native-web";
import opportunityStyle from "./styles";

import {
  BsPlusSquare,
  BsPersonFill,
  BsFillTagFill,
  BsFillPersonLinesFill,
} from "react-icons/bs";
import { MdDescription, MdLocationOn } from "react-icons/md";
import {
  BiCalendarEvent,
  BiCalendarWeek,
  BiNotification,
  BiMailSend,
} from "react-icons/bi";
import { GrContact, GrMoney, GrDocumentUser } from "react-icons/gr";

import {
  FaSave,
  FaSuitcase,
  FaHashtag,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";

class RecommendedOpportunities extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.loadImages();
    this.setState({ loading: false });
  }

  loadImages = () => {
    console.log("trial");
  };
  /*
  componentWillUnmount = () => {
    this.props.firebase.userCreatedOpportunities().off();
  };
  */

  render() {
    const { loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div>
            {loading && (
              <div>
                <Text style={opportunityStyle.normal_text}>Loading ...</Text>
              </div>
            )}

            {!loading && (
              <div>
                <Text> Examples of job recommendations: </Text>
                 <Image
                style={{ width: 1293, height: 580 }}
                source={{
                 uri:
              "https://live.staticflickr.com/65535/50633474997_afd22a7f7b_o.png",
            }}
              />
              <Image
                style={{ width: 1302, height: 601 }}
                source={{
                 uri:
              "https://live.staticflickr.com/65535/50633387231_b1f8dc82b3_o.png",
            }}
              />
              <Image
                style={{ width: 1319, height: 618 }}
                source={{
                 uri:
              "https://live.staticflickr.com/65535/50633387271_a040b7b332_o.png",
            }}
              />
              <Image
                style={{ width: 1289, height: 582 }}
                source={{
                 uri:
              "https://live.staticflickr.com/65535/50633475057_f1b46324c8_o.png",
            }}
              />
              </div>
            )}
            
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}
export default withFirebase(RecommendedOpportunities);
