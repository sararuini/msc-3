import React, { Component } from "react";

import { AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";
import { View, Text, TextInput, Image } from "react-native-web";
import opportunityStyle from "./styles";
import { MdWork } from "react-icons/md";
import { BsPlusSquare, BsPersonFill, BsFillTagFill, BsFillPersonLinesFill} from "react-icons/bs";
import {MdDescription, MdLocationOn} from "react-icons/md"
import {BiCalendarEvent, BiCalendarWeek} from "react-icons/bi"
import {GrContact, GrMoney} from "react-icons/gr"

class Opportunities extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: "",
      description: "",
      location: "",
      jobType: "",
      salary: "",
      jobTags: "",
      startingDate: "",
      contact: "",
      skills: "",
      loading: false,
      opportunities: [],
      limit: 3,
    };
  }

  componentDidMount() {
    this.onListenForOpportunities();
  }

  onListenForOpportunities = () => {
    this.setState({ loading: true });

    this.props.firebase
      .opportunities()
      .orderByChild("createdAt")
      .limitToLast(this.state.limit)
      .on("value", (snapshot) => {
        const opportunityObject = snapshot.val();

        if (opportunityObject) {
          const opportunityList = Object.keys(opportunityObject).map((key) => ({
            ...opportunityObject[key],
            uid: key,
          }));

          this.setState({
            opportunities: opportunityList,
            loading: false,
          });
        } else {
          this.setState({ opportunities: null, loading: false });
        }
      });
  };
  onChangeText = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onCreateOpportunity = (event, authUser) => {
    const oppRef = this.props.firebase.opportunities().push();
    const oppKey = oppRef.key;

    oppRef.set({
      createdBy: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
      position: this.state.position,
      description: this.state.description,
      location: this.state.location,
      jobType: this.state.jobType,
      contact: this.state.contact,
      salary: this.state.salary,
      jobTags: this.state.jobTags,
      skills: this.state.skills,
      startingDate: this.state.startingDate,
    });

    this.props.firebase.userCreatedOpportunity(authUser.uid, oppKey).set({
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({
      position: "",
      description: "",
      contact: "",
      location: "",
      createdAt: "",
      jobType: "",
      jobTags: "",
      salary: "",
      startingDate: "",
      skills: ""
    });
  };

  componentWillUnmount() {
    this.props.firebase.opportunities().off();
  }

  render() {
    const {
      position,
      description,
      contact,
      location,
      jobType,
      jobTags,
      salary,
      skills,
      startingDate,
      loading,
    } = this.state;
    const isInvalid = position === "" || location === "" || contact === "";

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div>
            {loading && <div>Loading ...</div>}
            <View style={opportunityStyle.whole_page}>
              <View>
                <form
                  onSubmit={(event) =>
                    this.onCreateOpportunity(event, authUser)
                  }
                >
                  <View style={opportunityStyle.align_icon}>
                      <BsPlusSquare />

                    <Text style={opportunityStyle.header}>
                      Create a new opportunity
                    </Text>
                  </View>

                  <View style={opportunityStyle.align_icon}>
                      <BsPersonFill />

                    <Text style={opportunityStyle.normal_text}>
                      Position advertised:
                    </Text>
                  </View>
                    <TextInput
                      style={opportunityStyle.text_input}
                      placeholder="Position you are advertising for"
                      value={position}
                      nativeID="position"
                      blurOnSubmit="false"
                      onChangeText={(position) => this.setState({ position })}
                    />

                  <View style={opportunityStyle.align_icon}>
                      <MdDescription />

                    <Text style={opportunityStyle.normal_text}>
                      Opportunity description:
                    </Text>
                  </View>
                    <TextInput
                      style={opportunityStyle.text_input}
                      placeholder="Describe what this opportunity consists of"
                      value={description}
                      nativeID="description"
                      blurOnSubmit="false"
                      onChangeText={(description) => this.setState({ description })}
                    />

<View style={opportunityStyle.align_icon}>
                      <MdLocationOn />

                    <Text style={opportunityStyle.normal_text}>
                      Location:
                    </Text>
                  </View>
                    <TextInput
                      style={opportunityStyle.text_input}
                      placeholder="Address(es) of opportunity"
                      value={location}
                      nativeID="location"
                      blurOnSubmit="false"
                      onChangeText={(location) => this.setState({ location })}
                    />

<View style={opportunityStyle.align_icon}>
                      <BiCalendarWeek />

                    <Text style={opportunityStyle.normal_text}>
                      Job Type:
                    </Text>
                  </View>
                    <TextInput
                      style={opportunityStyle.text_input}
                      placeholder="Is the job full-time, part-time, commission, freelancer, one-Off, etc."
                      value={jobType}
                      nativeID="jobType"
                      blurOnSubmit="false"
                      onChangeText={(jobType) => this.setState({ jobType })}
                    />

                    <View style={opportunityStyle.align_icon}>
                      <BsFillTagFill />

                    <Text style={opportunityStyle.normal_text}>
                      Job Tags:
                    </Text>
                  </View>
                    <TextInput
                      style={opportunityStyle.text_input}
                      placeholder="Job Tags e.g.(Music Publishing, London, etc.)"
                      value={jobTags}
                      nativeID="jobTags"
                      blurOnSubmit="false"
                      onChangeText={(jobTags) => this.setState({ jobTags })}
                    />
                    <View style={opportunityStyle.align_icon}>
                      <BiCalendarEvent />

                    <Text style={opportunityStyle.normal_text}>
                      Starting Date: 
                    </Text>
                  </View>
                    <TextInput
                      style={opportunityStyle.text_input}
                      placeholder="When is the opportunity starting? (precise or approximate date)"
                      value={startingDate}
                      nativeID="startingDate"
                      blurOnSubmit="false"
                      onChangeText={(startingDate) => this.setState({ startingDate })}
                    />

<View style={opportunityStyle.align_icon}>
                      <GrContact />

                    <Text style={opportunityStyle.normal_text}>
                      Contact details to apply: 
                    </Text>
                  </View>
                    <TextInput
                      style={opportunityStyle.text_input}
                      placeholder="Please insert email address and/or phone number to apply to this opportunity"
                      value={contact}
                      nativeID="contact"
                      blurOnSubmit="false"
                      onChangeText={(contact) => this.setState({ contact })}
                    />

<View style={opportunityStyle.align_icon}>
                      <BsFillPersonLinesFill />

                    <Text style={opportunityStyle.normal_text}>
                      Skills needed to apply to opportunity: 
                    </Text>
                  </View>
                    <TextInput
                      style={opportunityStyle.text_input}
                      placeholder="List must-have and optional skills required for this opportunity"
                      value={skills}
                      nativeID="skills"
                      blurOnSubmit="false"
                      onChangeText={(skills) => this.setState({ skills })}
                    />

<View style={opportunityStyle.align_icon}>
                      <GrMoney />

                    <Text style={opportunityStyle.normal_text}>
                      Salary: 
                    </Text>
                  </View>
                    <TextInput
                      style={opportunityStyle.text_input}
                      placeholder="Specify if it's hourly/daily/weekly/monthly/ annual pay and the net amount"
                      value={salary}
                      nativeID="salary"
                      blurOnSubmit="false"
                      onChangeText={(salary) => this.setState({ salary })}
                    />

                  <button disabled={isInvalid} type="submit">
                    Publish opportunity
                  </button>
                </form>
              </View>

              {/*
                <Image
          style={{ width: 1920, height: 1280 }}
          source={{
            uri:
              "https://unsplash.com/photos/6liebVeAfrY",
          }}
          />
                 */}

              <View style={opportunityStyle.row}>
                <ul>
                  <View style={opportunityStyle.align_icon}>
                    <MdWork />
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "black",
                        fontSize: "18px",
                        fontFamily: "monospace",
                        paddingLeft: "10px",
                      }}
                      to={{
                        pathname: `${ROUTES.OPPORTUNITIES_AVAILABLE}`,
                      }}
                    >
                      Available opportunities
                    </Link>
                  </View>
                </ul>
                <ul>
                  <View style={opportunityStyle.align_icon}>
                    <MdWork />
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "black",
                        fontSize: "18px",
                        fontFamily: "monospace",
                        paddingLeft: "10px",
                      }}
                      to={{
                        pathname: `${ROUTES.OPPORTUNITIES_SAVED}`,
                      }}
                    >
                      Saved opportunities
                    </Link>
                  </View>
                </ul>

                <ul>
                  <View style={opportunityStyle.align_icon}>
                    <MdWork />
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "black",
                        fontSize: "18px",
                        fontFamily: "monospace",
                        paddingLeft: "10px",
                      }}
                      to={{
                        pathname: `${ROUTES.OPPORTUNITIES_PUBLISHED}`,
                      }}
                    >
                      Published opportunities
                    </Link>
                  </View>
                </ul>

                <ul>
                  <View style={opportunityStyle.align_icon}>
                    <MdWork />
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "black",
                        fontSize: "18px",
                        fontFamily: "monospace",
                        paddingLeft: "10px",
                      }}
                      to={{
                        pathname: `${ROUTES.OPPORTUNITIES_APPLIED}`,
                      }}
                    >
                      Applied opportunities
                    </Link>
                  </View>
                </ul>
              </View>
            </View>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Opportunities);
