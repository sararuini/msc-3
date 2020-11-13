import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import 'firebase/storage'

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
    this.storage = app.storage();

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

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.user(authUser.uid)
          .once("value")
          .then((snapshot) => {
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

  // DATABASE ref

  // *** User API ***
  user = (uid) => this.db.ref(`users/${uid}`);
  users = () => this.db.ref("users");
  //Connections
  userConnection = (uid1, uid2) =>
    this.db.ref(`users/${uid1}/connections/${uid2}`);
  userConnections = (uid) => this.db.ref(`users/${uid}/connections`);
  //Saved Opportunities
  userSavedOpportunities = (uid) =>
    this.db.ref(`users/${uid}/savedOpportunities`);
  userSavedOpportunity = (uid, oid) =>
    this.db.ref(`users/${uid}/savedOpportunities/${oid}`);
  //Applied Opportunities
  userAppliedOpportunities = (uid) =>
    this.db.ref(`users/${uid}/appliedOpportunities`);
  userAppliedOpportunity = (uid, oid) =>
    this.db.ref(`users/${uid}/appliedOpportunities/${oid}`);
  //Created Opportunties
  userCreatedOpportunities = (uid) =>
    this.db.ref(`users/${uid}/createdOpportunities`);
  userCreatedOpportunity = (uid, oid) =>
    this.db.ref(`users/${uid}/createdOpportunities/${oid}`);
  //User bands
  userBands = (uid) => this.db.ref(`users/${uid}/bands`);
  userBand = (uid, bid) => this.db.ref(`users/${uid}/bands/${bid}`);
  //User Posts
  userPosts = (uid) => this.db.ref(`users/${uid}/posts`);
  userPost = (uid, bid) => this.db.ref(`users/${uid}/posts/${bid}`);
  //User Events
  userEvents = (uid) => this.db.ref(`users/${uid}/events`);
  userEvent = (uid, bid) => this.db.ref(`users/${uid}/events/${bid}`);

  // *** Band Profile API ***
  band = (uid) => this.db.ref(`bands/${uid}/`);
  bands = () => this.db.ref(`bands/`);
  // Members
  bandMembers = (uid) => this.db.ref(`bandMembers/${uid}/`);
  bandMember = (uid, bid) => this.db.ref(`bandMembers/${uid}/${bid}`);
  // Member Requests
  bandMemberRequests = (uid) =>
    this.db.ref(`bandMemberRequests/${uid}/requests`);
  bandMemberRequest = (bid, uid) =>
    this.db.ref(`bandMemberRequests/${bid}/requests/${uid}`);
  //Band Applied Opportunties
  bandAppliedOpportunities = (uid) =>
    this.db.ref(`bandAppliedOpportunities/${uid}`);
  bandAppliedOpportunity = (uid, oid) =>
    this.db.ref(`bandAppliedOpportunities/${uid}/${oid}`);

  // *** Timeline Posts API ***
  post = (uid) => this.db.ref(`posts/${uid}`);
  posts = () => this.db.ref("posts");
  comments = (uid) => this.db.ref(`comments/${uid}`);
  comment = (uid, cid) => this.db.ref(`comments/${uid}/${cid}`);

  likes = (uid) => this.db.ref(`likes/${uid}`);
  like = (uid, cid) => this.db.ref(`likes/${uid}/${cid}`);

  // *** Events API ***
  event = (uid) => this.db.ref(`events/${uid}`);
  events = () => this.db.ref("evens");

  //***  Opportunity API ***/
  opportunity = (uid) => this.db.ref(`opportunities/${uid}`);
  opportunities = () => this.db.ref("opportunities");
  // Saved //
  savedOpportunity = (uid) => this.db.ref(`savedOpportunities/${uid}`);
  savedOpportunities = () => this.db.ref(`savedOpportunities/`);
  // Applied //
  appliedOpportunity = (uid) => this.db.ref(`appliedOpportunities/${uid}`);
  appliedOpportunities = () => this.db.ref(`appliedOpportunities/`);

  // *** Notifications API ***/
  notifications = (uid) => this.db.ref(`notifications/${uid}`);
  notification = (uid, nid) => this.db.ref(`notifications/${uid}/${nid}`);

  // ** Connections API *** /
  //Connections
  connection = (uid) => this.db.ref(`connections/${uid}`);
  connections = () => this.db.ref(`connections/`);
  // Pending connections
  pendingConnections = () => this.db.ref(`pendingConnections`);
  pendingConnection = (uid) => this.db.ref(`pendingConnections/${uid}`);
  

  // ** STORAGE API **
  // User profile
  userProfilePicture = (pic) => this.storage.ref(`/profilePicture/${pic}`)
}

export default Firebase;

{/* 
Sources: 
Used code template from book / code repo:
Wieruch, R. (2019) The road to React with Firebase.    
Wieruch, R. (2020) React-firebase-authentication. Available at: https://github.com/the-road-to-react-with-firebase/react-firebase-authentication (Accessed: 12 June 2020).
*/}