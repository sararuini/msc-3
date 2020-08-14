import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
//import 'firebase/storage';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    /* Helper */

    this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = app.auth();
    this.db = app.database();
    //this.storage = app.storage();

    /* Social Sign In Method Provider */

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
  
  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***
  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref('users');
  userPendingConnection = (uid1, uid2)=> this.db.ref(`users/${uid1}/pendingConnections/${uid2}`)
  userPendingConnections = uid => this.db.ref(`users/${uid}/pendingConnections`)
  userConnection = (uid1, uid2)=> this.db.ref(`users/${uid1}/connections/${uid2}`)
  userConnections = uid => this.db.ref(`users/${uid}/connections`)
  userCreatedOpps = (uid) => this.db.ref(`users/${uid}/opportunities`)
  userCreatedOpp = (uid, oid) => this.db.ref(`users/${uid}/opportunities/${oid}`)
  
  // *** Timeline Posts API ***
  post = uid => this.db.ref(`posts/${uid}`);
  posts = () => this.db.ref('posts');
  
  //***  Opportunity API ***/
  opportunity = uid => this.db.ref(`opportunities/${uid}`);
  opportunities = () => this.db.ref('opportunities');

  // ** Connections API *** /
  connection = uid =>  this.db.ref(`connections/${uid}`);
  connections = () =>  this.db.ref(`connections/`);
  pendingConnections = () => this.db.ref(`pendingConnections`)
  pendingConnection = uid => this.db.ref(`pendingConnections/${uid}`)
 }

export default Firebase;