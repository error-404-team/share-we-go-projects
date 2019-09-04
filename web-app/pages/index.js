import React from 'react';
import firebase from 'firebase';
import { connectDatabasse } from 'share-we-go-firebase-database'

const config = {
    apiKey: "AIzaSyAavAERYgTafnnYxjIGaW9Xb7GaUdgSvLk",
    authDomain: "share-we-go.firebaseapp.com",
    databaseURL: "https://share-we-go.firebaseio.com",
    projectId: "share-we-go",
    storageBucket: "share-we-go.appspot.com",
    messagingSenderId: "950367710306",
    appId: "1:950367710306:web:219271895378fa7e"
}

connectDatabasse(config);

class Index extends React.Component {

    state = { auth: false }

    componentDidMount() {

        // เชคค่าสถานะ auth ของ firebase
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // กำหนดค่า ตัวแปล authenticate ใน ตัวแปล fakeAuth ให้ค่า = true
                fakeAuth.authenticate(() => {
                    this.setState({ auth: true });
                });
            }
        });
    }

    render() {
        const { auth } = this.state;

        return (
            <React.Fragment>
                {auth == true
                    ? <React.Fragment>true</React.Fragment>
                    : <React.Fragment>false</React.Fragment>
                }
            </React.Fragment>
        )
    }
}

export default Index;