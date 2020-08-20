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
  //Connections
  userConnection = (uid1, uid2)=> this.db.ref(`users/${uid1}/connections/${uid2}`)
  userConnections = uid => this.db.ref(`users/${uid}/connections`)

  // User opportunities
  //Saved
  userSavedOpportunities = (uid) => this.db.ref(`users/${uid}/savedOpportunities`)
  userSavedOpportunity = (uid, oid) => this.db.ref(`users/${uid}/savedOpportunities/${oid}`)
  //Applied
  userAppliedOpportunities = (uid) => this.db.ref(`users/${uid}/appliedOpportunities`)
  userAppliedOpportunity = (uid, oid) => this.db.ref(`users/${uid}/appliedOpportunities/${oid}`)
  //Created
  userCreatedOpportunities = (uid) => this.db.ref(`users/${uid}/createdOpportunities`)
  userCreatedOpportunity = (uid, oid) => this.db.ref(`users/${uid}/createdOpportunities/${oid}`)
  
  //bands
  userBands = (uid) => this.db.ref(`users/${uid}/bands`)
  userBand = (uid,bid) => this.db.ref(`users/${uid}/bands/${bid}`)

 // *** Band Profile API ***
  band = (uid) =>(`bands/${uid}/`)
  bands = () =>(`bands/`)

  // *** Timeline Posts API ***
  post = uid => this.db.ref(`posts/${uid}`);
  posts = () => this.db.ref('posts');


  //***  Opportunity API ***/
  opportunity = uid => this.db.ref(`opportunities/${uid}`);
  opportunities = () => this.db.ref('opportunities');
  // Saved //
  savedOpportunity = uid => this.db.ref(`savedOpportunities/${uid}`);
  savedOpportunities = () => this.db.ref(`savedOpportunities/`);
  // Applied //
  appliedOpportunity = uid => this.db.ref(`appliedOpportunities/${uid}`);
  appliedOpportunities = () => this.db.ref(`appliedOpportunities/`);


  // ** Connections API *** /
  //Connections
  connection = uid =>  this.db.ref(`connections/${uid}`);
  connections = () =>  this.db.ref(`connections/`);
  // Pending connections
  pendingConnections = () => this.db.ref(`pendingConnections`)
  pendingConnection = uid => this.db.ref(`pendingConnections/${uid}`)
 }

export default Firebase;