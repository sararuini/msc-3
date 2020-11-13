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
    this.loadHardcodedData();
    this.setState({ loading: false });
  }

  loadHardcodedData = () => {
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
              <View>
                <Text style={opportunityStyle.header}>
                  Your Recommended Opportunities
                </Text>

                <View style={opportunityStyle.rec_opportunity_style}>
                  <View style={opportunityStyle.align_icon}>
                    <BsPersonFill />
                    <View style={opportunityStyle.align_text}>
                      <Text style={opportunityStyle.header}>
                        Position advertised:
                      </Text>
                      <Text style={opportunityStyle.normal_text}>
                        {" "}
                        Senior Artist Manager (UK)
                      </Text>
                    </View>
                  </View>

                  <View style={opportunityStyle.align_icon}>
                    <FaSuitcase />
                    <View style={opportunityStyle.align_text}>
                      <Text style={opportunityStyle.header}>
                        Company/ Person advertising:
                      </Text>
                      <Text style={opportunityStyle.normal_text}>
                        Handle Recruitment
                      </Text>
                    </View>
                  </View>

                  <View style={opportunityStyle.align_icon}>
                    <MdLocationOn />
                    <View style={opportunityStyle.align_text}>
                      <Text style={opportunityStyle.header}>Location:</Text>
                      <Text style={opportunityStyle.normal_text}>London</Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    padding: "3px",
                  }}
                />

                <View style={opportunityStyle.rec_opportunity_style}>
                  <View style={opportunityStyle.align_icon}>
                    <BsPersonFill />
                    <View style={opportunityStyle.align_text}>
                      <Text style={opportunityStyle.header}>
                        Position advertised:
                      </Text>
                      <Text style={opportunityStyle.normal_text}>
                        {" "}
                        Artist Management Assistant{" "}
                      </Text>
                    </View>
                  </View>

                  <View style={opportunityStyle.align_icon}>
                    <FaSuitcase />
                    <View style={opportunityStyle.align_text}>
                      <Text style={opportunityStyle.header}>
                        Company/ Person advertising:
                      </Text>
                      <Text style={opportunityStyle.normal_text}>
                        {" "}
                        One House Artists{" "}
                      </Text>
                    </View>
                  </View>

                  <View style={opportunityStyle.align_icon}>
                    <MdLocationOn />
                    <View style={opportunityStyle.align_text}>
                      <Text style={opportunityStyle.header}>Location:</Text>
                      <Text style={opportunityStyle.normal_text}> London</Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    padding: "3px",
                  }}
                />
                <View style={opportunityStyle.rec_opportunity_style}>
                  <View style={opportunityStyle.align_icon}>
                    <BsPersonFill />
                    <View style={opportunityStyle.align_text}>
                      <Text style={opportunityStyle.header}>
                        Position advertised:
                      </Text>
                      <Text style={opportunityStyle.normal_text}>
                        {" "}
                        Executive and Team Assistant
                      </Text>
                    </View>
                  </View>

                  <View style={opportunityStyle.align_icon}>
                    <FaSuitcase />
                    <View style={opportunityStyle.align_text}>
                      <Text style={opportunityStyle.header}>
                        Company/ Person advertising:
                      </Text>
                      <Text style={opportunityStyle.normal_text}>
                        {" "}
                        Hardlivings Artist Management{" "}
                      </Text>
                    </View>
                  </View>

                  <View style={opportunityStyle.align_icon}>
                    <MdLocationOn />
                    <View style={opportunityStyle.align_text}>
                      <Text style={opportunityStyle.header}>Location:</Text>
                      <Text style={opportunityStyle.normal_text}>
                        {" "}
                        London, United Kingdom
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    padding: "3px",
                  }}
                />
                <View style={opportunityStyle.rec_opportunity_style}>
                  <View style={opportunityStyle.align_icon}>
                    <BsPersonFill />
                    <View style={opportunityStyle.align_text}>
                      <Text style={opportunityStyle.header}>
                        Position advertised:
                      </Text>
                      <Text style={opportunityStyle.normal_text}>
                        {" "}
                        Day-to-Day Artist Manager
                      </Text>
                    </View>
                  </View>

                  <View style={opportunityStyle.align_icon}>
                    <FaSuitcase />
                    <View style={opportunityStyle.align_text}>
                      <Text style={opportunityStyle.header}>
                        Company/ Person advertising:
                      </Text>
                      <Text style={opportunityStyle.normal_text}>
                        {" "}
                        !k7 music
                      </Text>
                    </View>
                  </View>

                  <View style={opportunityStyle.align_icon}>
                    <MdLocationOn />
                    <View style={opportunityStyle.align_text}>
                      <Text style={opportunityStyle.header}>Location:</Text>
                      <Text style={opportunityStyle.normal_text}>
                        {" "}
                        Germany/ UK
                      </Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    padding: "3px",
                  }}
                />

                <View style={opportunityStyle.rec_opportunity_style}>
                  <View style={opportunityStyle.align_icon}>
                    <BsPersonFill />
                    <View style={opportunityStyle.align_text}>
                      <Text style={opportunityStyle.header}>
                        Position advertised:
                      </Text>
                      <Text style={opportunityStyle.normal_text}>
                        {" "}
                        Day to Day Manager
                      </Text>
                    </View>
                  </View>

                  <View style={opportunityStyle.align_icon}>
                    <FaSuitcase />
                    <View style={opportunityStyle.align_text}>
                      <Text style={opportunityStyle.header}>
                        Company/ Person advertising:
                      </Text>
                      <Text style={opportunityStyle.normal_text}>
                        {" "}
                        Prolifica Management
                      </Text>
                    </View>
                  </View>

                  <View style={opportunityStyle.align_icon}>
                    <MdLocationOn />
                    <View style={opportunityStyle.align_text}>
                      <Text style={opportunityStyle.header}>Location:</Text>
                      <Text style={opportunityStyle.normal_text}>
                        {" "}
                        London, United Kingdom
                      </Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    padding: "3px",
                  }}
                />

                <View style={opportunityStyle.rec_opportunity_style}>
                  <View style={opportunityStyle.align_icon}>
                    <BsPersonFill />
                    <View style={opportunityStyle.align_text}>
                      <Text style={opportunityStyle.header}>
                        Position advertised:
                      </Text>
                      <Text style={opportunityStyle.normal_text}>
                        Senior manager, Artist relations
                      </Text>
                    </View>
                  </View>

                  <View style={opportunityStyle.align_icon}>
                    <FaSuitcase />
                    <View style={opportunityStyle.align_text}>
                      <Text style={opportunityStyle.header}>
                        Company/ Person advertising:
                      </Text>
                      <Text style={opportunityStyle.normal_text}>
                        {" "}
                        Soundcloud
                      </Text>
                    </View>
                  </View>

                  <View style={opportunityStyle.align_icon}>
                    <MdLocationOn />
                    <View style={opportunityStyle.align_text}>
                      <Text style={opportunityStyle.header}>Location:</Text>
                      <Text style={opportunityStyle.normal_text}>
                        {" "}
                        Los Angeles, United States
                      </Text>
                    </View>
                  </View>
                </View>

                <Link
                  to={{
                    pathname: `${ROUTES.OPPORTUNITIES}`,
                  }}
                >
                  <Text style={opportunityStyle.normal_text}>
                    Go back to main opportunities page
                  </Text>
                </Link>
              </View>
            )}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}
export default withFirebase(RecommendedOpportunities);
