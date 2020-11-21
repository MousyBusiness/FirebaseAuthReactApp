import React, { SyntheticEvent, useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import firebase from './utils/firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  or: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  github: {
    width: '100% !important',
    margin: '0 !important',
  },

  githubText: {
    fontSize: '14px !important',
    fontWeight: 'bold'
  }
}));

type State = {
    email: string
    password: string
  }
  
  const initialState = {
    email: '',
    password: '',
  }

  //https://github.com/firebase/firebaseui-web-react

  // Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/signedIn',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ]
  };
  
  interface AuthObserver {
    unregisterAuthObserver: firebase.Unsubscribe;
  }
  class SignUp extends React.Component {

    // The component's Local state.
    state = {
      isSignedIn: false // Local signed-in state.
    };
  
    // Configure FirebaseUI.
    uiConfig = {
      // Popup signin flow rather than redirect flow.
      signInFlow: 'popup',
      // We will display Google and Facebook as auth providers.
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false
      }
    };
  
    // Listen to the Firebase Auth state and set the local state.
    componentDidMount() {
      (this as unknown as AuthObserver).unregisterAuthObserver = firebase.auth().onAuthStateChanged(
          (user) => this.setState({isSignedIn: !!user})
      );
    }
    
    // Make sure we un-register Firebase observers when the component unmounts.
    componentWillUnmount() {
        (this as unknown as AuthObserver).unregisterAuthObserver();
    }
  
    render() {
      if (!this.state.isSignedIn) {
        return (
          <div>
            <h1>My App</h1>
            <p>Please sign-in:</p>
            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
          </div>
        );
      }
      return (
        <div>
          <h1>My App</h1>
          <p>Welcome! You are now signed-in!</p>
          <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
        </div>
      );
    }
  }

export default SignUp