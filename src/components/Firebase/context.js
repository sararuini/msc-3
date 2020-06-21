import React from 'react';

//ReactContext API is used to manage react instances
//createContext() creates a 'Provider' component which provides a Firebase instance at top of component hierarchy
// and 'Consumer' component which  retrieves the Firebase instance if needed
const FirebaseContext = React.createContext(null);

export default FirebaseContext;