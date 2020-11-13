import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import * as serviceWorker from './serviceWorker';

import App from './components/App';
import Firebase, { FirebaseContext } from './components/Firebase';

//A Firebase instance is generated and passed it as props to React context.
//This Firebase instance can be accessed by every component in the React component hierarchy 
// via "Firebase.Context.Consumer"
ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App /> {/* App instance (main component*/}
  </FirebaseContext.Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

{/* 
Sources: 
Used code template from book / code repo:
Wieruch, R. (2019) The road to React with Firebase.    
Wieruch, R. (2020) React-firebase-authentication. Available at: https://github.com/the-road-to-react-with-firebase/react-firebase-authentication (Accessed: 12 June 2020).
*/}