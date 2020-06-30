import firebase from "firebase";
import firebaseConfig from "./firebaseConfig";
import "firebase/auth";
import withFirebaseAuth from "react-with-firebase-auth";
const firebaseApp = firebase.initializeApp(firebaseConfig);

let props;

class FirebaseMethods {
  constructor() {
    const { user, signOut, signInWithGoogle } = props;
    console.log(props.user);
  }
  logIn = (event) => {
    console.log("LOGGGGGGGGGGGGGGGGGGGGGG");
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(props.email, props.password)
      .catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
  };
  signUp = (event) => {
    console.log("SINNNNNNNNNNG");
    event.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(props.email, props.password)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  };
}
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};
export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})({ FirebaseMethods });
