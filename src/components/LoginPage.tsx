import React from "react";
import Button from "react-bootstrap/button";
import "./styles/LoginPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { auth, googleAuthProvider } from "../firebase/firebaseConfig";
import LoginForm from "./LoginForm";
import logo from "../images/logo.png";
import { CardBody } from "react-bootstrap/Card";

class LoginPage extends React.Component {
    state = {
        email: "",
        password: "",
        signInError: "",
    };

    setEmail = (event: React.ChangeEvent<any>) => {
        this.setState({ email: event.target.value });
    };

    setPassword = (event: React.ChangeEvent<any>) => {
        this.setState({ password: event.target.value });
    };

    signIn = (email: string, password: string) => {
        auth.signInWithEmailAndPassword(email, password).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            this.setState({ signInError: errorMessage });
            // ...
        });
    };

    signUp = (email: string, password: string) => {
        auth.createUserWithEmailAndPassword(email, password).catch(function (
            error
        ) {
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
        auth.onAuthStateChanged((user) => {
            this.setState({
                email: "",
                password: "",
                signInError: "",
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
        //console.log(user);
        let userDisplay;
        if (auth.currentUser) {
            userDisplay = (
                <>
                    <div style={{ height: "5rem" }} />
                    <Button variant="danger" onClick={() => auth.signOut()}>
                        Sign out
                    </Button>
                    <p style={{ marginTop: "1rem" }}>
                        Signed in with {auth.currentUser.email}
                    </p>
                </>
            );
        } else {
            userDisplay = (
                <>
                    <LoginForm
                        email={this.state.email}
                        setEmail={this.setEmail}
                        password={this.state.password}
                        setPassword={this.setPassword}
                        signIn={this.signIn}
                        signUp={this.signUp}
                        signOut={auth.signOut}
                        signInError={this.state.signInError}
                    />
                    <Button
                        variant="outline-primary"
                        onClick={() => auth.signInWithPopup(googleAuthProvider)}
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

                <div style={{ textAlign: "center" }}>{userDisplay}</div>
            </div>
        );
    }
}

export default LoginPage; // cant decide what it is
