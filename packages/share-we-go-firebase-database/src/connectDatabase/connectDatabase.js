import React from 'react';
import * as firebase from 'firebase';

// const firebaseConfig = {
//     apiKey: "AIzaSyAavAERYgTafnnYxjIGaW9Xb7GaUdgSvLk",
//     authDomain: "share-we-go.firebaseapp.com",
//     databaseURL: "https://share-we-go.firebaseio.com",
//     projectId: "share-we-go",
//     storageBucket: "share-we-go.appspot.com",
//     messagingSenderId: "950367710306",
//     appId: "1:950367710306:web:219271895378fa7e"
// }

function connectDatabase(config) {
  return firebase.initializeApp(config);
}
// Get the Firebase config from the auto generated file.

// Instantiate a Firebase app.
export default connectDatabase;
