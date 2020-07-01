import React, { useState, useEffect } from "react"; //Import React and define hooks

import "./LoginPage.css"; //Import the styling for the jsx in this file

import "bootstrap/dist/css/bootstrap.min.css"; //Imporst bootstrap styling
import Button from "react-bootstrap/button"; //Imports bootstrap Button preset
import Form from "react-bootstrap/form"; //Imports boFtstrap orm Preset
import FirebaseMethods from "./FirebaseMethods"; //Imports our custom firebase methods
var firebase = require("firebase");
var firebaseui = require("firebaseui");

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const ui = new firebaseui.auth.AuthUI(firebase.auth());

  ui.start("#firebaseui-auth-container", {
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
    // Other config options...
  });
  return (
    <div className="Page">
      <Form>
        <Form.Group controlId="formBasicEmail" xs={7}>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Button
            variant="primary"
            type="submit"
            onClick={FirebaseMethods.logIn}
          >
            Log In
          </Button>
          <Button
            variant="secondary"
            type="submit"
            onClick={FirebaseMethods.signUp}
          >
            Sign Up
          </Button>
        </Form.Group>
      </Form>
      <h2>Or</h2>

      {FirebaseMethods.user ? (
        <>
          <script
            src="https://apis.google.com/js/platform.js"
            async
            defer
          ></script>
          <meta name="google-signin-client_id" content="YOUR_CLIENT_ID" />
          <meta
            name="google-signin-cookiepolicy"
            content="single_host_origin"
          />
          <meta name="google-signin-scope" content="profile email"></meta>
          <div class="g-signin2" data-onsuccess="onSignIn"></div>
          <h1>Hello, {FirebaseMethods.user.displayName}</h1>
        </>
      ) : (
        <>
          <Button variant="primary" onClick={FirebaseMethods.signInWithGoogle}>
            Sign in with Google
          </Button>
          <h1>NERD</h1>
        </>
      )}
    </div>
  );
}

export default LoginPage;
