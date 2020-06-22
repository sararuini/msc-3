import app from 'firebase/app';
import 'firebase/auth'; //Firebase authentication component

//configuration is present in '.env' file, not shared on github
const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MEASUREMENTID
  };

//class is used to encapsulate firebase functionalities
class Firebase {
    constructor(){
        app.initializeApp(config);
        this.auth = app.auth(); //Firebase authentication package
    }

// ****** Authentication API ******
// Communication channel from Firebase class to Firebase API
    // Email + psw is used for authentication

    // Creates user
    doCreateUserWithEmailAndPassword = (email, password) => 
        this.auth.createUserWithEmailAndPassword(email, password);
    
    // Sign in
    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    // Sign out
    doSignOut = () => this.auth.signOut();

    //Password reset
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    //Change password
    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);
}

export default Firebase;