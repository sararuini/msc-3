import React, { Component } from "react";

import { withFirebase } from "../Firebase";

import { Link } from "react-router-dom";
import Select from "react-select";

import * as ROUTES from "../../constants/routes";

let options = [];

class OpportunityItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      title: "",
      location: "",
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    console.log("Opportunity Item" + this.props.opportunity.uid);
    this.retrieveOppInfo()
    this.setState({ loading: false });
  }

  retrieveOppInfo = () => {
    const oppId = this.props.opportunity.uid;
    
    this.props.firebase.opportunity(oppId).once("value", (snapshot) => {
      const oppObj = snapshot.val();
      this.setState({
        title: oppObj.title,
        description: oppObj.description,
        location: oppObj.location,
      });
    });
  };

  render() {
    const { authUser, opportunity } = this.props;
    const { loading, title,location } = this.state;

    return (
      <span>
        <ul>
          <div>
            <label>{title}</label>
            <p>Location: {location}</p>
          </div>
          <Link
            to={{
              pathname: `${ROUTES.OPPORTUNITIES}/${opportunity.uid}/profile`,
            }}
          >
            {" "}
            View more
          </Link>
        </ul>
      </span>
    );
  }
}

export default withFirebase(OpportunityItem);
