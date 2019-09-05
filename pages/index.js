import React from 'react';
import Loading from './loading';
import Login from './login';
import firebase from "../lib/firebase";
import { writeUserData } from '../firebase-database/write-data';

const Index = (props) => {
    const [loading, setLoding] = React.useState(true);
    const [auth, setAuth] = React.useState(false);

    setTimeout(() => {
        setLoding(false)
    }, 3000)

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {

            // รับค่าจาก firebase auth
            const { uid, displayName, email, photoURL, phoneNumber } = user;
            // กำหนดค่า ตัวแปล authenticate ใน ตัวแปล fakeAuth ให้ค่า = true
            setAuth(true)

            // เขียนข้อมูล user ให้ database
            writeUserData(uid, displayName, email, photoURL, phoneNumber)
            
            // console.log(user);

        }
    });

    return (
        <React.Fragment>
            {loading == true
                ? <Loading state={loading} />
                : <React.Fragment>
                    {auth == true
                        ? <React.Fragment>logOn</React.Fragment>
                        : <Login />
                    }
                </React.Fragment>
            }
        </React.Fragment>
    )
}

export default Index;