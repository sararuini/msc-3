import React from 'react';

//ReactContext API is used to manage react instances
//createContext() creates a 'Provider' component which provides a Firebase instance at top of component hierarchy
// and 'Consumer' component which  retrieves the Firebase instance if needed
const FirebaseContext = React.createContext(null);

export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
);

export default FirebaseContext;