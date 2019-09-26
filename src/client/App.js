import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import firebase from 'firebase';
// import logo from './logo.svg';
import posed, { PoseGroup } from 'react-pose';
import './App.css';
import AuthView from './templates/AuthView';
import LogoView from './templates/LogoView';
import PrivateView from './templates/PrivateView';
import HomeView from './templates/HomeView';
import ShareLocationView from './templates/ShareLocationView';
import View from './components/View';



class App extends React.Component {
  state = { redirectToReferrer: false }
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
          this.setState({ redirectToReferrer: true });
        });
      }
    });

  }

  render() {

    // let { from } = this.props.location.state || { from: { pathname: "/protected" } };
    // console.log(this.state.position);


    return (
      <Router  position={this.state.position}>
        <Route render={({ location }) => (
          <View style={view_style.container} >
          <Redirect to="/protected" />
              <Switch location={location}>
                <Route path="/login" component={Login} />
                <PrivateRoute path="/protected" component={PrivateView} />
              </Switch>
            </View>
        )} />
      </Router>
    )
  }
}
const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 300, beforeChildren: true },
  exit: { opacity: 0 }
});

// ฐานเชค ข้อมูล login
const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    // กำหนดเวลาแสดงผล
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    // กำหนดเวลาแสดงผล
    setTimeout(cb, 100);
  }
};

// เชค และ กำหนด url 
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated ? (
          <PoseGroup>
            <RouteContainer key={location.pathname}>
              {/* <Switch location={props.location}> */}
                <Route exact path="/protected" component={PrivateView} />
                <Route path="/protected/home" component={HomeView} />
                <Route path="/protected/share_location" component={ShareLocationView} />
              {/* </Switch> */}
            </RouteContainer>
          </PoseGroup>
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
      }
    />
  );
}

class Login extends Component {
  state = { redirectToReferrer: false, setTimeoutLogoView: true, };


  componentDidMount() {
    setTimeout(() => {
      this.setState({
        setTimeoutLogoView: false
      })
      // console.log(`setTimeoutLogoView: ${this.state.setTimeoutLogoView}`);
    }, 3000)

    // เชคค่าสถานะ auth ของ firebase
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // กำหนดค่า ตัวแปล authenticate ใน ตัวแปล fakeAuth ให้ค่า = true
        fakeAuth.authenticate(() => {
          this.setState({ redirectToReferrer: true });
        });
      } else {
        // กำหนดค่า ตัวแปล authenticate ใน ตัวแปล fakeAuth ให้ค่า = false
        this.setState({ redirectToReferrer: false });
      }
    });

  }

  render() {
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <React.Fragment>
        {this.state.setTimeoutLogoView
          ? <LogoView />
          : <AuthView />
        }
      </React.Fragment>
    );
  }
}

const view_style = {
  container: {
    display: 'flex'
  }
}


export default App;
