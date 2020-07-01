import React from "react"; // Import React and define hooks

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

import logo from "./images/logo.png";
// Firebase Init app with config from previously imported config firebese file.org
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

    render() {
        const { user, signOut, signInWithGoogle } = this.props; // witchcraft
        console.log(user);
        return (
            <div className="Page">
                <img src={logo} alt="We sympathise with your broken eyes" />
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
                        <Button variant="primary" type="submit">
                            Log In
                        </Button>
                        <Button variant="secondary" type="submit">
                            Sign Up
                        </Button>
                    </Form.Group>
                </Form>

                {user ? (
                    <>
                        <h1>Hello, {user.displayName}</h1>
                        <Button variant="danger" onClick={signOut}>
                            Sign out
                        </Button>
                    </>
                ) : (
                    <>
                        <h2>Or</h2>
                        <Button variant="primary" onClick={signInWithGoogle}>
                            Sign in with Google
                        </Button>
                    </>
                )}
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
