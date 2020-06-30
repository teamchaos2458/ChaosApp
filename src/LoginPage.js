import React, { useState, useEffect } from "react"; //Import React and define hooks

import "./FirebaseMethods"; //Import the methods we made to simplify and reuse firebase functions

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
          <script src="https://apis.google.com/js/platform.js" async defer></script>
          <meta name="google-signin-client_id" content="76269935740-4uvtsq2vqtblpom4kfmh2giikmamkn44.apps.googleusercontent.com" />
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
          <Button variant="primary" >
            Sign in with Google
          </Button>
          <h1>NERD</h1>
        </>
      )}
    </div>
  );
}

//Put this in button for signout onClick={signOut()}

//Runs when the Google SignIn button is clicked
function onSignIn(googleUser) {
  console.log('google auth response',googleUser);
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.getAuthResponse().id_token);
      // Sign in with credential from the Google user.
      firebase.auth().signInWithCredential(credential).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    } else {
      console.log('User already signed-in Firebase.');
    }
  });
}

//Runs to check if the user is already logged in (preventing the need to relogin the user)
//Called by OnSignIn
function isUserEqual(googleUser, firebaseUser) {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
}

//Signs the user out
/*
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}
*/
export default LoginPage;
