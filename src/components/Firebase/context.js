import React from "react";

//ReactContext API is used to manage react instances
//createContext() creates a 'Provider' component which provides a Firebase instance at top of component hierarchy
// and 'Consumer' component which  retrieves the Firebase instance if needed
const FirebaseContext = React.createContext(null);

export const withFirebase = (Component) => (props) => (
  <FirebaseContext.Consumer>
    {(firebase) => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export default FirebaseContext;


{/* 
Sources: 
Used code template from book / code repo:
Wieruch, R. (2019) The road to React with Firebase.    
Wieruch, R. (2020) React-firebase-authentication. Available at: https://github.com/the-road-to-react-with-firebase/react-firebase-authentication (Accessed: 12 June 2020).
*/}
