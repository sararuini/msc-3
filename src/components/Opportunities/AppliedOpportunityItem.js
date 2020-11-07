import React, { Component } from "react";

import { Link } from "react-router-dom";
import { View, Text } from "react-native-web";
import opportunityStyle from "./styles";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import {
  BsPlusSquare,
  BsPersonFill,
  BsFillTagFill,
  BsFillPersonLinesFill,
} from "react-icons/bs";
import { MdDescription, MdLocationOn } from "react-icons/md";
import { BiCalendarEvent, BiCalendarWeek, BiNotification} from "react-icons/bi";
import { GrContact, GrMoney, GrDocumentUser} from "react-icons/gr";
import {FaSave, FaSuitcase, FaHashtag} from "react-icons/fa";
import {CgUserList } from "react-icons/cg";

class AppliedOpportunityItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      position: "",
      company: "",
      contact: "",
      skills: "",
      description: "",
      jobType: "",
      jobTags: "",
      location: "",
      salary: "",
      startingDate: "",
      createdBy: "",
      opportunityCreator: "",
      statusMessage: "",
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    console.log("applied opportunity " + this.props.appliedOpportunity.uid)
    this.loadAppliedOpportunity();
    this.retrieveUsername();
    this.retrieveStatus()
    this.setState({ loading: false });
  }

  componentWillUnmount() {
    const thisOpp = this.props.appliedOpportunity.uid;
    this.props.firebase.opportunity(thisOpp).off();
  }

  retrieveUsername = () => {
    const opp = this.props.appliedOpportunity.uid;
    console.log("usernameeee " + opp);
    console.log("opp " + opp);
    this.props.firebase.opportunity(opp).once("value", (snapshot) => {
      const oppObj = snapshot.val();
      const createdBy = oppObj.createdBy;
      console.log("createdBy" + createdBy);
      console.log("creadteb by " + createdBy);
      this.props.firebase.user(createdBy).once("value", (snapshot) => {
        const userUsername = snapshot.val().username;
        console.log("username: " + userUsername);
        this.setState({ opportunityCreator: userUsername });
      });
    });
  };

  retrieveStatus = () => {
    const opp = this.props.appliedOpportunity.uid;
    const user = this.props.authUser.uid;
    this.props.firebase
      .userAppliedOpportunity(user, opp)
      .once("value", (snapshot) => {
        const message = snapshot.val().statusMessage;

        this.setState({
          statusMessage: message,
        });
      });
      console.log("status " + this.state.statusMessage)
  };

  loadAppliedOpportunity = () => {
    const opp = this.props.appliedOpportunity.uid;

    this.props.firebase.opportunity(opp).once("value", (snapshot) => {
      const oppObj = snapshot.val();
      const company = oppObj.company;
      const position = oppObj.position;
      const skills = oppObj.skills;
      const contact = oppObj.contact;
      const description = oppObj.description;
      const jobType = oppObj.jobType;
      const jobTags = oppObj.jobTags;
      const location = oppObj.location;
      const salary = oppObj.salary;
      const createdBy = oppObj.createdBy;
      const startingDate = oppObj.startingDate;

      this.setState({
        position: position,
        contact: contact,
        company: company,
        description: description,
        jobType: jobType,
        jobTags: jobTags,
        location: location,
        salary: salary,
        startingDate: startingDate,
        createdBy: createdBy,
        skills:skills,
      });
    });
  };

  render() {
    const { authUser, appliedOpportunity } = this.props;

    const {
      position,
      skills,
      contact,
      company,
      description,
      jobType,
      jobTags,
      location,
      salary,
      startingDate,
      createdBy,
      opportunityCreator,
      statusMessage,
    } = this.state;

    return (
      <div>
        {authUser && (
          <span>
            <ul>
            <Text style={opportunityStyle.normal_text}>Created by: </Text>
            <Link
              to={{
                pathname: `${ROUTES.USERS}/${createdBy}`,
              }}
            >
              <Text style={opportunityStyle.normal_text}>{opportunityCreator}</Text>
            </Link>
            <View style={opportunityStyle.align_icon}>
              <BsPersonFill />
                <Text style={opportunityStyle.header}>Position advertised:</Text>
            <Text style={opportunityStyle.normal_text}>{position}</Text>
            </View>

            <View style={opportunityStyle.align_icon}>
            <FaSuitcase />
          <Text style={opportunityStyle.header}>Company/ Person advertising:</Text>
            <Text style={opportunityStyle.normal_text}>{company}</Text>
          </View>

          <View style={opportunityStyle.align_icon}>
          <MdDescription />         
          <Text style={opportunityStyle.header}>Description:</Text>
            <Text style={opportunityStyle.normal_text}>{description}</Text>
          </View>

          <View style={opportunityStyle.align_icon}>
          <MdLocationOn />

          <Text style={opportunityStyle.header}>Location:</Text>
            <Text style={opportunityStyle.normal_text}>{location}</Text>
          </View>

          <View style={opportunityStyle.align_icon}>
          <BiCalendarWeek />

          <Text style={opportunityStyle.header}>Job Type:</Text>
            <Text style={opportunityStyle.normal_text}>{jobType}</Text>
          </View>
          <View style={opportunityStyle.align_icon}>
          <GrContact />

          <Text style={opportunityStyle.header}>Contact:</Text>
            <Text style={opportunityStyle.normal_text}>{contact}</Text>
          </View>
          <View style={opportunityStyle.align_icon}>
          <BsFillTagFill />

          <Text style={opportunityStyle.header}>Job Tags:</Text>
            <Text style={opportunityStyle.normal_text}>{jobTags}</Text>
          </View>
          <View style={opportunityStyle.align_icon}>
          <BsFillPersonLinesFill />

          <Text style={opportunityStyle.header}>Skills Required:</Text>
            <Text style={opportunityStyle.normal_text}>{skills}</Text>
          </View>
          <View style={opportunityStyle.align_icon}>
          <GrMoney />

          <Text style={opportunityStyle.header}>Salary:</Text>
            <Text style={opportunityStyle.normal_text}>{salary}</Text>
          </View>

          <View style={opportunityStyle.align_icon}>
            <BiCalendarEvent />

          <Text style={opportunityStyle.header}>Starting Date:</Text>

            <Text style={opportunityStyle.normal_text}>{startingDate}</Text>
          </View>
          <View style={opportunityStyle.align_icon}>
            <FaHashtag />
            <Text style={opportunityStyle.header}>Opportunity Code:</Text>
            <Text style={opportunityStyle.normal_text}>{appliedOpportunity.uid}</Text>
          </View>
          </ul>
          </span>
        )}
        {statusMessage === "" && (
           <Text style={opportunityStyle.normal_text}>There is no application status message</Text>
        )}

        {statusMessage && (
          <div>
                      <View style={opportunityStyle.align_icon}>
            <BiNotification />
            <Text style={opportunityStyle.header}>Application Status Message:</Text> 
            <Text style={opportunityStyle.normal_text}>{statusMessage}</Text>
            </View>
          </div>
        )}
        
      </div>
    );
  }
}

export default withFirebase(AppliedOpportunityItem);
