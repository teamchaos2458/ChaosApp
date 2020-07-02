import React from "react"; // Import React

// Styling
import Button from "react-bootstrap/button"; // Imports bootstrap Button preset
import Form from "react-bootstrap/form"; // Imports bootstrap Form Preset
import "./styles/LoginPage.css"; // Import the styling for the jsx in this file
import "bootstrap/dist/css/bootstrap.min.css";
// Firebase
import withFirebaseAuth, {
    WrappedComponentProps,
} from "react-with-firebase-auth"; // Import Firebase Witchcraft
import firebase from "firebase/app";
import firebaseConfig from "../firebaseConfig.json"; // Import Firebase config
import "firebase/auth";

import LoginForm from "./LoginForm";
import logo from "../images/logo.png";

const firebaseApp = firebase.initializeApp(firebaseConfig);

class LoginPage extends React.Component<WrappedComponentProps> {
    state = {
        email: "",
        password: "",
    };

    setEmail = (event: React.ChangeEvent<any>) => {
        this.setState({ email: event.target.value });
    };

    setPassword = (event: React.ChangeEvent<any>) => {
        this.setState({ password: event.target.value });
    };

    signIn = (email: string, password: string) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            });
    };

    signUp = (email: string, password: string) => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            });
        this.setState({
            email: "",
            password: "",
        });
    };

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({
                email: "",
                password: "",
            });
            if (user) {
                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                var providerData = user.providerData;
                console.log("Signed In!");
                console.log(user.email);
                // ...
            } else {
                // User is signed out.
                console.log("Signed Out.");
            }
        });
    };

    render() {
        const { user, signOut, signInWithGoogle } = this.props; // witchcraft
        //console.log(user);
        let userDisplay;
        if (user) {
            userDisplay = (
                <>
                    <Button variant="danger" onClick={signOut}>
                        Sign out
                    </Button>
                    <p style={{ marginTop: "1rem" }}>
                        Signed in with {user.email}
                    </p>
                </>
            );
        } else {
            userDisplay = (
                <>
                    <Button
                        variant="outline-primary"
                        onClick={signInWithGoogle}
                    >
                        Sign in with Google
                    </Button>
                </>
            );
        }
        return (
            <div className="Page">
                <img
                    style={{ width: "20rem" }}
                    src={logo}
                    alt="Team Chaos 2458 Logo"
                />
                <LoginForm
                    email={this.state.email}
                    setEmail={this.setEmail}
                    password={this.state.password}
                    setPassword={this.setPassword}
                    signIn={this.signIn}
                    signUp={this.signUp}
                    signOut={signOut}
                />
                <div style={{ textAlign: "center" }}>{userDisplay}</div>
            </div>
        );
    }
}

const firebaseAppAuth = firebaseApp.auth(); // constantly authorizing or smth  idk

const providers = {
    // provides for its family
    googleProvider: new firebase.auth.GoogleAuthProvider(), // google be rich
};

export default withFirebaseAuth({
    // get out of my country
    providers,
    firebaseAppAuth, // what more can I say
})(LoginPage); // cant decide what it is
