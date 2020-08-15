import React, { Component } from "react";

import { Link } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

class SavedOpportunityItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  componentDidMount () {
    this.setState({loading: true})
    this.setState({loading: false})
  }

  render() {
    const {
      authUser,
      savedOpportunity,
    } = this.props;

    return (
      <div>
        {authUser && (
          <span>
            <span>{connectionUsername}</span>
            <Link
              to={{
                pathname: `${ROUTES.USERS}/${connection.user}`,
                //state: { user },
              }}
            >
             {connection.user}
            </Link>
            <button onClick={() => deleteConnection(connection.uid)}>
              {" "}
              Delete Connection
            </button>
          </span>
        )}
      </div>
    );
  }
}

export default withFirebase(SavedOpportunityItem);
