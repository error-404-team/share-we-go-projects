import React from 'react';
import io from 'socket.io-client'
import Loading from './loading';
import Login from './login';
import Private from './private'
import firebase from "../lib/firebase";
import '../css/styles.css';




class Index extends React.Component {

    // fetch old messages data from the server


    state = {
        auth: false,
        loading: true,
        position: this.props.position,
    }

    componentDidMount() {

        const socket = io(`http://localhost:8080/`)



        // กำหนดเวลาโชว์การเปิดตัว
        setTimeout(() => {
            this.setState({ loading: false })
        }, 3000)

        // ตรวจการเข้าใช้ ของผู้ใช้งาน
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {

                // รับค่าจาก firebase auth
                // const { uid, displayName, email, photoURL, phoneNumber } = user;

                // กำหนดค่า ตัวแปล authenticate = true
                this.setState({ auth: true })

                if (navigator.geolocation) {
                    navigator.geolocation.watchPosition(function (position) {
                        var data = {
                            displayName: user.displayName,
                            email: user.email,
                            isAnonymous: user.isAnonymous,
                            metadata: user.metadata,
                            phoneNumber: user.phoneNumber,
                            photoURL: user.photoURL,
                            providerData: user.providerData,
                            ra: user.ra,
                            refreshToken: user.refreshToken,
                            u: user.u,
                            uid: user.uid,
                            _lat: user._lat,
                            coords: {
                                accuracy: position.coords.accuracy,
                                altitude: position.coords.altitude,
                                altitudeAccuracy: position.coords.altitudeAccuracy,
                                heading: position.coords.heading,
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                                speed: position.coords.speed
                            }
                        };


                        // console.log(data);
                        socket.emit('users', data)

                    }, function () {
                        handleLocationError(true, infoWindow, map.getCenter());
                    });
                }
            }

        });


    }

    onValue = (position) => {
        this.setState({ position: position })

    }

    render() {

        const { loading, auth } = this.state;

        return (
            <React.Fragment>
                {loading == true
                    ? <Loading />
                    : <React.Fragment>
                        {auth == true
                            ? <Private />
                            : <Login />
                        }
                    </React.Fragment>
                }
            </React.Fragment>
        )
    }
}


export default Index;