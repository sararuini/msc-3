import React, { Component } from 'react';

class ConnectionRequestItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      connectionRequest: null,
      loading: false,
      ...props.location.state,
    };
  }

  componentDidMount() {
    if (this.state.user) {
      return;
    }

    this.setState({ loading: true });

    this.props.firebase
      .user(this.props.match.params.id)
      .on('value', snapshot => {
        this.setState({
          user: snapshot.val(),
          loading: false,
        });
      });
  }

  render() {
    const { connectionRequest, loading } = this.state;

    return (
      <div>
        <h2> Connection Request ({this.props.match.params.id})</h2>
        {loading && <div>Loading ...</div>}

        {connectionRequest && (
          <div>
            <span>
              <strong>ID:</strong> {connectionRequest.uid}
            </span>
            
          </div>
        )}
      </div>
    );
  }
}

export default ConnectionRequestItem;