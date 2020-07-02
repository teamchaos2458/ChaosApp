import React from "react"; // Import React

// Styling
import Button from "react-bootstrap/button"; // Imports bootstrap Button preset
import Form from "react-bootstrap/form"; // Imports bootstrap Form Preset
import "./styles/LoginPage.css"; // Import the styling for the jsx in this file

// Firebase
import withFirebaseAuth, {
    WrappedComponentProps,
} from "react-with-firebase-auth"; // Import Firebase Witchcraft
import firebase from "firebase/app";
import firebaseConfig from "../firebaseConfig.json"; // Import Firebase config
import "firebase/auth";

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

    emailSignIn = (email: string, password: string) => {
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

    emailSignOut = () => {
        firebase
            .auth()
            .signOut()
            .then(function () {
                console.log("Signed Out");
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(function (user) {
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
                    <Button variant="primary" onClick={signInWithGoogle}>
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
                <Form>
                    <Form.Group controlId="formBasicEmail" /*xs={7}*/>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.setEmail}
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.setPassword}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Button
                            variant="primary"
                            style={{ marginRight: "1rem" }}
                            onClick={() =>
                                this.emailSignIn(
                                    this.state.email,
                                    this.state.password
                                )
                            }
                        >
                            Log In
                        </Button>
                        <Button variant="secondary">Sign Up</Button>
                    </Form.Group>
                </Form>
                <div>{userDisplay}</div>
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
