import React, { Component } from "react";

import { Link } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

import bandStyle from "./styles";
import { View, Text } from "react-native-web";

class BandItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  componentDidMount = () => {
    this.setState({ loading: true });
    this.setState({ loading: false });
  };

  componentWillUnmount() {
    const band = this.props.band.uid;
    this.props.firebase.band(band).off();
  }

  render() {
    const { authUser, band } = this.props;

    return (
      <div>
        {authUser && (
          <span>
            <ul>
              <Link
                to={{
                  pathname: `${ROUTES.BANDS}/${band.uid}`,
                  //state: { user },
                }}
              >
                <Text style={bandStyle.header}>
                {band.name}
                </Text>
              </Link>
            </ul>
          </span>
        )}
      </div>
    );
  }
}

export default withFirebase(BandItem);
