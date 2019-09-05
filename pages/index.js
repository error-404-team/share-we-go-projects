import React from 'react';
import Loading from './loading';
import Login from './login';
import firebase from "../lib/firebase";


const Index = (props) => {
    const [loading, setLoding] = React.useState(true);
    const [auth, setAuth] = React.useState(false);

    setTimeout(() => {
        setLoding(false)
    }, 3000)

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // กำหนดค่า ตัวแปล authenticate ใน ตัวแปล fakeAuth ให้ค่า = true
          setAuth(true)
          console.log(user);
          
        }
      });

    return (
        <React.Fragment>
            {loading == true
                ? <Loading />
                : <React.Fragment>
                {auth == true
                ? <React.Fragment>logOn</React.Fragment>
                : <Login/>
            }
                </React.Fragment>
            }
        </React.Fragment>
    )
}

export default Index;