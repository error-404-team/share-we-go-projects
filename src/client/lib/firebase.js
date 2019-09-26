import firebase from "firebase";

const config = {
    apiKey: "AIzaSyAavAERYgTafnnYxjIGaW9Xb7GaUdgSvLk",
    authDomain: "share-we-go.firebaseapp.com",
    databaseURL: "https://share-we-go.firebaseio.com",
    projectId: "share-we-go",
    storageBucket: "share-we-go.appspot.com",
    messagingSenderId: "950367710306",
    appId: "1:950367710306:web:219271895378fa7e"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default firebase;