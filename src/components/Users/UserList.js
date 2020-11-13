import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import page_styles from "./styles";
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { View, Text } from "react-native-web";

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount(){
    this.setState({ loading: true });

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

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

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <View style={page_styles.whole_page}>
          <Text style={page_styles.header}>Users</Text>
        {loading && <div>Loading ...</div>}
        <ul>
          {users.map(user => (
            <li key={user.uid}>
                <Link
                style={{
                  color: "black",
                  fontSize: "18px",
                  fontFamily: "monospace",
                  paddingLeft: "10px",
                }}
                  to={{
                    pathname: `${ROUTES.USERS}/${user.uid}`,
                    state: { user },
                  }}
                >
                  {user.username}
                </Link>
                <Text style={{
                  color: "black",
                  fontSize: "18px",
                  fontFamily: "monospace",
                  paddingLeft: "10px",
                  fontWeight: "bold"
                }}> Headline:</Text><Text style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: "18px",
                  fontFamily: "monospace",
                  paddingLeft: "10px",
                }}>{user.headline}</Text>
                <Text style={{
                  color: "black",
                  fontSize: "18px",
                  fontFamily: "monospace",
                  paddingLeft: "10px",
                  fontWeight: "bold"
                }}> Location: </Text> <Text style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: "18px",
                  fontFamily: "monospace",
                  paddingLeft: "10px",
                }}>{user.location}</Text>
            </li>
          ))}
        </ul>
      </View>
    );
  }
}

export default withFirebase(UserList);

{/* 
Sources: 
Used code template from book / code repo:
Wieruch, R. (2019) The road to React with Firebase.    
Wieruch, R. (2020) React-firebase-authentication. Available at: https://github.com/the-road-to-react-with-firebase/react-firebase-authentication (Accessed: 12 June 2020).
*/}