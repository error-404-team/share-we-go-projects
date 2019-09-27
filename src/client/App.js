import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import firebase from 'firebase';
import {routerPublic,routerPrivate} from './routers';
import './App.css';





class App extends React.Component {
  state = {
    redirectToReferrer: false,
    auth: false
  }
  componentDidMount() {
    // บล็อกการ zoom
    document.firstElementChild.style.zoom = "reset";

    // ระบุตำแหน่ง
    navigator.geolocation.watchPosition((position) => {
      // this.pos = this.props.google.maps.LatLng(position.coords.latitude,position.coords.longitude)
      this.setState({ position: { lat: position.coords.latitude, lng: position.coords.longitude } })
    })

    // เชคค่าสถานะ auth ของ firebase
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // กำหนดค่า ตัวแปล authenticate ใน ตัวแปล fakeAuth ให้ค่า = true
        fakeAuth.authenticate(() => {
          this.setState({
            redirectToReferrer: true,
            auth: true
          });
        });
      }
    });

  }

  render() {

    // let { from } = this.props.location.state || { from: { pathname: "/protected" } };
    // console.log(this.state.position);
    const { auth, redirectToReferrer } = this.state;

    return (
      <React.Fragment>
        <Router>
        {redirectToReferrer == false
          ? (<React.Fragment>page loading</React.Fragment>)
          : (<React.Fragment>
            {auth === false
              ? (<React.Fragment>{
                routerPublic.map((route, index) => (
                  <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.sidebar}
                />
                ))
              }</React.Fragment>)
              : (<React.Fragment>{routerPrivate.map((route, index) => (
                <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.sidebar}
              />
              ))}</React.Fragment>)
            }
          </React.Fragment>)
        }
        </Router>
      </React.Fragment>
    )
  }
}


export default App;
