import React, { Component } from "react";

import { AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";
import { View, Text, TextInput, Image } from "react-native-web";
import opportunityStyle from "./styles";
import { MdWork } from "react-icons/md";
import {
  BsPlusSquare,
  BsPersonFill,
  BsFillTagFill,
  BsFillPersonLinesFill,
  BsPersonSquare,
} from "react-icons/bs";
import { MdDescription, MdLocationOn } from "react-icons/md";
import { BiCalendarEvent, BiCalendarWeek } from "react-icons/bi";
import { GrContact, GrMoney, GrDocumentUser} from "react-icons/gr";
import {FaSave, FaSuitcase} from "react-icons/fa";
import {CgUserList } from "react-icons/cg";

class Opportunities extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: "",
      description: "",
      company: "",
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
      company: this.state.company,
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
      company: "",
      contact: "",
      location: "",
      createdAt: "",
      jobType: "",
      jobTags: "",
      salary: "",
      startingDate: "",
      skills: "",
    });
  };

  componentWillUnmount() {
    this.props.firebase.opportunities().off();
  }

  render() {
    const {
      position,
      description,
      company,
      contact,
      location,
      jobType,
      jobTags,
      salary,
      skills,
      startingDate,
      loading,
    } = this.state;
    const isInvalid = position === "" || location === "" || contact === "" || company === "";

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div>
            {loading && <div>Loading ...</div>}
            <View style={opportunityStyle.whole_page}>
              <View style={opportunityStyle.opportunity_create_container}>
                <form
                  onSubmit={(event) =>
                    this.onCreateOpportunity(event, authUser)
                  }
                >
                  <View style={opportunityStyle.item_create}>
                    <View style={opportunityStyle.align_icon}>
                    <BsPlusSquare />

                    <Text style={opportunityStyle.header}>
                      Create a new opportunity
                    </Text>
                  </View>
                  </View>
                  
                  
                  <View style={opportunityStyle.item_create}>
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
                  </View>

                  <View style={opportunityStyle.item_create}>
                    <View style={opportunityStyle.align_icon}>
                    <FaSuitcase />

                  <Text style={opportunityStyle.normal_text}>
                      Company/ Person advertising:
                    </Text>
                  </View>
                  <TextInput
                    style={opportunityStyle.text_input}
                    placeholder="Company / Person that is advertising"
                    value={company}
                    nativeID="company"
                    blurOnSubmit="false"
                    onChangeText={(company) => this.setState({ company })}
                  />
                  </View>


                  
                  <View style={opportunityStyle.item_create}>
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
                    onChangeText={(description) =>
                      this.setState({ description })
                    }
                  />
                  </View>
                  
                  <View style={opportunityStyle.item_create}>
                    <View style={opportunityStyle.align_icon}>
                    <MdLocationOn />

                    <Text style={opportunityStyle.normal_text}>Location:</Text>
                  </View>
                  <TextInput
                    style={opportunityStyle.text_input}
                    placeholder="Address(es) of opportunity"
                    value={location}
                    nativeID="location"
                    blurOnSubmit="false"
                    onChangeText={(location) => this.setState({ location })}
                  />
                  </View>
                  
                  <View style={opportunityStyle.item_create}>
                    <View style={opportunityStyle.align_icon}>
                    <BiCalendarWeek />

                    <Text style={opportunityStyle.normal_text}>Job Type:</Text>
                  </View>
                  <TextInput
                    style={opportunityStyle.text_input}
                    placeholder="Is the job full-time, part-time, commission, freelancer, one-Off, etc."
                    value={jobType}
                    nativeID="jobType"
                    blurOnSubmit="false"
                    onChangeText={(jobType) => this.setState({ jobType })}
                  />
                  </View>
                  
                  <View style={opportunityStyle.item_create}>
                    <View style={opportunityStyle.align_icon}>
                    <BsFillTagFill />

                    <Text style={opportunityStyle.normal_text}>Job Tags:</Text>
                  </View>
                  <TextInput
                    style={opportunityStyle.text_input}
                    placeholder="Job Tags e.g.(Music Publishing, London, etc.)"
                    value={jobTags}
                    nativeID="jobTags"
                    blurOnSubmit="false"
                    onChangeText={(jobTags) => this.setState({ jobTags })}
                  />
                  </View>
                  
                  <View style={opportunityStyle.item_create}>
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
                    onChangeText={(startingDate) =>
                      this.setState({ startingDate })
                    }
                  />
                  </View>
                  
                  <View style={opportunityStyle.item_create}>
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
                  </View>
                  
                  <View style={opportunityStyle.item_create}>
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
                  </View>
                  
                  <View style={opportunityStyle.item_create}>
                    <View style={opportunityStyle.align_icon}>
                    <GrMoney />

                    <Text style={opportunityStyle.normal_text}>Salary:</Text>
                  </View>
                  <TextInput
                    style={opportunityStyle.text_input}
                    placeholder="Specify if it's hourly/daily/weekly/monthly/ annual pay and the net amount"
                    value={salary}
                    nativeID="salary"
                    blurOnSubmit="false"
                    onChangeText={(salary) => this.setState({ salary })}
                  />
                  </View>
                  
                  <View style={opportunityStyle.item_create}>
                    <button disabled={isInvalid} type="submit">
                      Publish opportunity
                    </button>
                  </View>
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
              <View style={opportunityStyle.row_opps}>
                <View style={opportunityStyle.available_opp}>
                  <View style={opportunityStyle.align_icon}>
                    <MdWork />
                    <Link
                      style={{
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
                </View>
                <View style={opportunityStyle.saved_opp}>
                  <View style={opportunityStyle.align_icon}>
                    <FaSave />
                    <Link
                      style={{
                        color: "black",
                        fontSize: "18px",
                        fontFamily: "monospace",
                        paddingLeft: "10px",
                      }}
                      to={{
                        pathname: `${ROUTES.OPPORTUNITIES_SAVED}`,
                      }}
                    >
                      Saved Opportunities
                    </Link>
                  </View>
                </View>

                <View style={opportunityStyle.published_opp}>
                  <View style={opportunityStyle.align_icon}>
                    <CgUserList />
                    <Link
                      style={{
                        color: "black",
                        fontSize: "18px",
                        fontFamily: "monospace",
                        paddingLeft: "10px",
                      }}
                      to={{
                        pathname: `${ROUTES.OPPORTUNITIES_PUBLISHED}`,
                      }}
                    >
                      Published Opportunities
                    </Link>
                  </View>
                </View>

                <View style={opportunityStyle.applied_opp}>
                  <View style={opportunityStyle.align_icon}>
                    <GrDocumentUser />
                    <Link
                      style={{
                        color: "black",
                        fontSize: "18px",
                        fontFamily: "monospace",
                        paddingLeft: "10px",
                      }}
                      to={{
                        pathname: `${ROUTES.OPPORTUNITIES_APPLIED}`,
                      }}
                    >
                      Applied Opportunities
                    </Link>
                  </View>
                </View>

                
                <View style={opportunityStyle.applied_opp}>
                  <View style={opportunityStyle.align_icon}>
                    <BsPersonSquare />
                    <Link
                      style={{
                        color: "black",
                        fontSize: "18px",
                        fontFamily: "monospace",
                        paddingLeft: "10px",
                      }}
                      to={{
                        pathname: `${ROUTES.OPPORTUNITIES_RECOMMENDED}`,
                      }}
                    >
                      Recommended Opportunities
                    </Link>
                  </View>
                </View>
              </View>
            </View>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Opportunities);
