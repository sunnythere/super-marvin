import React from 'react'
import { database, auth } from '../firebase'


export default class SignIn extends React.Component {

  constructor(props) {
    super(props)

  }

  componentWillMount() {
    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(auth());
    // Keep track of the currently signed in user.
    var currentUid = null;
  }

 //Redirects to the FirebaseUI widget.
  signInWithRedirect() {
    //window.location.assign('/widget');
  };

//Open a popup with the FirebaseUI widget.
  signInWithPopup() {
   // window.open('/widget', 'Sign In', 'width=985,height=735');
  };


/**
 * Displays the UI for a signed in user.
 * @param {!firebase.User} user
 */
handleSignedInUser(user) {
  currentUid = user.uid;
  document.getElementById('user-signed-in').style.display = 'block';
  document.getElementById('user-signed-out').style.display = 'none';
  document.getElementById('name').textContent = user.displayName;
  document.getElementById('email').textContent = user.email;
  if (user.photoURL){
    document.getElementById('photo').src = user.photoURL;
    document.getElementById('photo').style.display = 'block';
  } else {
    document.getElementById('photo').style.display = 'none';
  }
};

/**
 * Displays the UI for a signed out user.
 */
handleSignedOutUser() {
  document.getElementById('user-signed-in').style.display = 'none';
  document.getElementById('user-signed-out').style.display = 'block';
  ui.start('#firebaseui-container', uiConfig);
};

// Listen to change in auth state so it displays the correct UI for when
// the user is signed in or not.
firebase.auth().onAuthStateChanged(function(user) {
  // The observer is also triggered when the user's token has expired and is
  // automatically refreshed. In that case, the user hasn't changed so we should
  // not update the UI.
  if (user && user.uid == currentUid) {
    return;
  }
  document.getElementById('loading').style.display = 'none';
  document.getElementById('loaded').style.display = 'block';
  user ? handleSignedInUser(user) : handleSignedOutUser();
});

/**
 * Deletes the user's account.
 */
var deleteAccount = function() {
  firebase.auth().currentUser.delete().catch(function(error) {
    if (error.code == 'auth/requires-recent-login') {
      // The user's credential is too old. She needs to sign in again.
      firebase.auth().signOut().then(function() {
        // The timeout allows the message to be displayed after the UI has
        // changed to the signed out state.
        setTimeout(function() {
          alert('Please sign in again to delete your account.');
        }, 1);
      });
    }
  });
};


/**
 * Initializes the app.
 */
var initApp = function() {
  document.getElementById('sign-in-with-redirect').addEventListener(
      'click', signInWithRedirect);
  document.getElementById('sign-in-with-popup').addEventListener(
      'click', signInWithPopup);
  document.getElementById('sign-out').addEventListener('click', function() {
    firebase.auth().signOut();
  });
  document.getElementById('delete-account').addEventListener(
      'click', function() {
        deleteAccount();
      });
};

window.addEventListener('load', initApp);

}
