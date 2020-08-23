import React, { Component } from "react";

import { withFirebase } from "../Firebase";

import { Link } from "react-router-dom";
import Select from "react-select";

import * as ROUTES from "../../constants/routes";

class NotificationProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    console.log("notificaaation profile " + this.props.match.params.id)
    this.setState({ loading: false });
  }

  componentWillUnmount (){
    //const oppId = this.props.match.params.id;
    //this.props.firebase.notification(oppId).off();
  }

  render() {
    const { authUser } = this.props;
    const {
      
    } = this.state;

    return (
      <div>

      </div>
    );
  }
}

export default withFirebase(NotificationProfile);
