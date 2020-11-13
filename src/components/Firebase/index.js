import FirebaseContext, { withFirebase } from "./context";
import Firebase from "./firebase";

export default Firebase;
export { FirebaseContext, withFirebase }; // provides Firebase instance to entire application

{/* 
Sources: 
Used code template from book / code repo:
Wieruch, R. (2019) The road to React with Firebase.    
Wieruch, R. (2020) React-firebase-authentication. Available at: https://github.com/the-road-to-react-with-firebase/react-firebase-authentication (Accessed: 12 June 2020).
*/}