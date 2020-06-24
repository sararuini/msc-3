/* import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

// Admins manage users
class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }
  // fetching users from realtime db
  componentDidMount() {
    this.setState({ loading: true });
    //listener is triggered when something is changed
    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      //Users are displayed as arrays rather than json objects
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  //listener is removed
  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  //list of users is rendered
  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h1>Admin</h1>
      
        {loading && <div>Loading ...</div>}

        <UserList users={users} />
      </div>
    );
  }
}

const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <span>
          <strong>E-Mail:</strong> {user.email}
        </span>
        <span>
          <strong>Username:</strong> {user.username}
        </span>
      </li>
    ))}
  </ul>
);

export default withFirebase(AdminPage);
*/