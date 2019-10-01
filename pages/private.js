import React, { Fragment } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import $ from "jquery";
import Router, { useRouter } from 'next/router';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';
import GroupIcon from '@material-ui/icons/Group';
import Fab from '@material-ui/core/Fab';
import HistoryIcon from '@material-ui/icons/History';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Map, ConnectApiMaps } from '../lib/maps';
import SearchMap from '../components/SearchMap';
import SearchBar from '../components/SearchBar';
import {
    writeUserDataLogin,
    writeUserDataLocation,
    joinGroupShare,
    writeCreateGroupShareUserDataHeader,
    writeCreateGroupShareUserDataHeaderAndWay,
    writeHistory,
    shareLocation
} from '../firebase-database/write-data';
import firebase from '../lib/firebase';
import '../css/map.css';
import '../css/styles.css';
import '../css/share-location-bar.css';
// import { func } from 'prop-types';

require('es6-promise').polyfill();
require('isomorphic-fetch');

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'contents',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    bigAvatar: {
        margin: 10,
        marginTop: 50,
        width: 60,
        height: 60,
    },
}));






const Private = function (props) {
    const theme = useTheme();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [users, setUsers] = React.useState({});
    const [map, setMap] = React.useState({});
    const [statusShare, setStatusShare] = React.useState(false)
    const router = useRouter()
    // const [google, setGoogle] = React.useState({});
    // var starCountRef = firebase.database().ref('users/' + postId + '/starCount');

    // var user;
    // var position;


    // กำหนดตัวแปล latlng
    let latlng;

    fetch(`http://localhost:8080/users`).then(function (response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    }).then(function (stories) {
        writeUserDataLogin(stories.uid, stories)
        writeUserDataLocation(stories.uid, stories.coords)
        latlng = { lat: stories.coords.latitude, lng: stories.coords.longitude }
        // console.log(stories);

    })


    function handleDrawerOpen() {
        setOpen(true);

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // setUsers(user);
                firebase.database().ref('profile/' + user.uid).on('value', function (profileUser) {
                    let data = (profileUser.val())
                    // console.log(data);
                    if (data !== null) {
                        setUsers(data)
                    } else {
                        firebase.database().ref('users/' + user.uid).on('value', function (dataUser) {
                            let dataState = (dataUser.val())
                            // console.log(dataState);
                            setUsers(dataState)
                        })
                    }
                })
            }
        })
    }

    function handleDrawerClose() {
        setOpen(false);
    }

    function Logout() {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            window.location.reload()
        }).catch(function (error) {
            // An error happened.
        });
    }


    if (latlng == undefined) {
        // แทนค่า ตัวแปล latlng ลงไป
        latlng = { lat: 14.013235199999999, lng: 100.6985216 }

    }

    // console.log(map);


    return (
        <Fragment>
            <CssBaseline />
            <div className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })} >
                <Map google={props.google}
                    opts={{
                        zoom: 15,
                        center: { lat: latlng.lat, lng: latlng.lat },
                        disableDefaultUI: true,
                        styles: [{
                            featureType: 'poi.business',
                            stylers: [{ visibility: 'on' }]
                        },
                        {
                            featureType: 'transit',
                            elementType: 'labels.icon',
                            stylers: [{ visibility: 'off' }]
                        }]
                    }}
                    setCenter={new google.maps.LatLng(latlng.lat, latlng.lng)}
                    DrawingOnMap={(google, map) => {
                        function CustomMarker(latlng, map, args, img) {
                            this.latlng = latlng;
                            this.args = args;
                            this.img = img;
                            this.setMap(map);

                            setMap(map)
                            // setGoogle(google)

                        }

                        CustomMarker.prototype = new google.maps.OverlayView();

                        CustomMarker.prototype.onAdd = function () {
                            var self = this;
                            var div = this.div;
                            if (!div) {
                                // Generate marker html
                                div = this.div = document.createElement('div');
                                div.className = 'custom-marker';
                                div.style.position = 'absolute';
                                var innerDiv = document.createElement('div');
                                innerDiv.className = 'custom-marker-inner';
                                innerDiv.innerHTML = `<img  src="${this.img}" style="border-radius: inherit;width: 20px;height: 20px;margin: 2px;"/>`
                                div.appendChild(innerDiv);

                                if (typeof (self.args.marker_id) !== 'undefined') {
                                    div.dataset.marker_id = self.args.marker_id;
                                }

                                google.maps.event.addDomListener(div, "click", function (event) {
                                    google.maps.event.trigger(self, "click");
                                });

                                var panes = this.getPanes();
                                panes.overlayImage.appendChild(div);
                            }
                        };

                        CustomMarker.prototype.draw = function () {
                            // มี bug icon ไม่เกาะ map
                            if (this.div) {
                                // กำหนด ตำแหน่ง ของhtml ที่สร้างไว้
                                let positionA = new google.maps.LatLng(this.latlng.lat, this.latlng.lng);

                                this.pos = this.getProjection().fromLatLngToDivPixel(positionA);
                                // console.log(this.pos);
                                this.div.style.left = this.pos.x + 'px';
                                this.div.style.top = this.pos.y + 'px';
                            }
                        };

                        CustomMarker.prototype.getPosition = function () {
                            return this.latlng;
                        };

                        fetch(`http://localhost:8080/users`).then(function (response) {
                            if (response.status >= 400) {
                                throw new Error("Bad response from server");
                            }
                            return response.json();
                        }).then(function (stories) {
                            var myLatlng = new google.maps.LatLng(stories.coords.latitude, stories.coords.longitude);

                            var marker1 = new CustomMarker(
                                myLatlng,
                                map,
                                {},
                                stories.photoURL
                            );

                            var pos = {
                                lat: stories.coords.latitude,
                                lng: stories.coords.longitude
                            };

                            marker1.latlng = { lat: pos.lat, lng: pos.lng };
                            marker1.draw();

                            map.setCenter(pos);

                            // console.log(stories);
                        });

                        firebase.auth().onAuthStateChanged((user) => {
                            if (user) {
                                firebase.database().ref(`/group_share_user/${user.uid}/share`).once('value').then(function (snapshot) {
                                    let status = (snapshot.val());
                                    setStatusShare(status)
                                })
                            }
                        })

                        firebase.database().ref(`/group_share_user/`).once('value').then(function (snapshot) {
                            var group_share_user = (snapshot.val());
                            console.log(group_share_user);

                            if (group_share_user !== null) {
                                Object.keys(group_share_user).map((key) => {
                                    firebase.database().ref(`/group_share_user/${key}`).once('value').then(function (snapshot) {
                                        var stories = (snapshot.val());
                                        if (stories.share === true) {
                                            let myLatlng = new google.maps.LatLng(stories.header.coords.latitude, stories.header.coords.longitude);

                                            let marker1 = new CustomMarker(
                                                myLatlng,
                                                map,
                                                {},
                                                stories.header.photoURL
                                            );

                                            let pos = {
                                                lat: stories.header.coords.latitude,
                                                lng: stories.header.coords.longitude
                                            };

                                            marker1.latlng = { lat: pos.lat, lng: pos.lng };
                                            marker1.draw();

                                            map.setCenter(pos);


                                            var contentString = `
                                                <center>
                                                <h2>ข้อมูลการแชร์</h2>
                                                </center>
                                                <hr></hr>
                                                <u style="font-size: 15px">ต้นทาง:</u></<u><b> ${stories.host.routes[0].legs[0].start_address} </b>
                                                <br></br>
                                                <u style="font-size: 15px">ปลายทาง:</u></<u><b>  ${stories.host.routes[0].legs[0].end_address} </b>
                                                <br></br>
                                                <u style="font-size: 15px">เริ่มแชร์เมื่อ:</u></<u><b> ${stories.date_time.start_time} </b>
                                                <br></br>
                                                <u style="font-size: 15px">ปิดแชร์เวลา:</u></<u><b>${stories.date_time.end_time} </b>
                                                <br></br>
                                                <u style="font-size: 15px">ต้องการผู้เดินทางเพิ่ม:</u></<u><b> ${stories.join !== undefined ? Object.keys(stories.join).length : 0} / ${stories.number_of_travel}  คน </b>
                                                <br></br>
                                                <u style="font-size: 15px">เดินทางกับเพศ:</u></<u><b> ${stories.gender} </b>
                                                <hr></hr>
                                                <center><button style="background-color: lime; font-size: 17px" id="join-share">เข้าร่วม</button></center>
                                                `



                                            var infowindow = new google.maps.InfoWindow({
                                                content: "",
                                                maxWidth: 500
                                            });

                                            marker1.addListener('click', function () {
                                                infowindow.setContent(contentString)
                                                infowindow.open(map, marker1);
                                            });

                                            $(document).on('click', '#join-share', function () {
                                                console.log(stories.join);
                                                if (stories.join !== undefined) {
                                                    if (Object.keys(stories.join).length >= stories.number_of_travel) {
                                                        firebase.auth().onAuthStateChanged((user) => {
                                                            Object.keys(stories.join).map((key) => {
                                                                if (user.uid !== key) {
                                                                    alert('จำนวนผู้เข้าร่วมเต็ม')
                                                                } else {
                                                                    setTimeout(() => router.push('/share_group/'), 100)
                                                                }
                                                            })
                                                        })

                                                    } else {
                                                        firebase.auth().onAuthStateChanged((user) => {
                                                            if (user) {
                                                                firebase.database().ref(`/users/${key}`).once('value').then(function (snapshot) {
                                                                    let dataHeader = (snapshot.val());
                                                                    writeCreateGroupShareUserDataHeader(user.uid, dataHeader);

                                                                    firebase.database().ref(`/group_share_user/${key}/host`).once('value').then(function (snapshot) {
                                                                        let dataHeaderAndWay = (snapshot.val());
                                                                        writeCreateGroupShareUserDataHeaderAndWay(user.uid, dataHeaderAndWay);
                                                                    });

                                                                });

                                                                firebase.database().ref(`/users/${user.uid}`).once('value').then(function (snapshot) {
                                                                    let dataJ = (snapshot.val());
                                                                    firebase.database().ref(`/group_share_user/`).once('value').then(function (snapshot) {
                                                                        let chackUser = (snapshot.val());
                                                                        Object.keys(chackUser).map((key) => {
                                                                            console.log(key);
                                                                            
                                                                            // if(chackUser[key].header.uid === user.uid) {
                                                                            //     alert('การเข้าร่วมแชร์นี้ จะทำการยกเลิกกลุ่มแชร์เดิม')
                                                                            //     shareLocation(user.uid, false)
                                                                            //     firebase.database().ref(`/group_share_user/${user.uid}/join`).remove()
                                                                            // }

                                                                            // if(chackUser[key].join.user[user.uid].uid === user.uid) {
                                                                            //     alert('การเข้าร่วมแชร์นี้ จะทำการออกแชร์เดิม')
                                                                            //     firebase.database().ref(`/group_share_user/${key}`).once('value').then(function (snapshot) {
                                                                            //         let dataHaderShare = (snapshot.val());
                                                                            //         writeHistory(user.uid, dataHaderShare)
                                                                            //       })
                                                                            //     firebase.database().ref(`/group_share_user/${key}/join/user/${user.uid}`).remove()
                                                                            // }
                                                                        })
                                                                    })

                                                                    joinGroupShare(key, user.uid, dataJ)
                                                                    setTimeout(() => router.push('/share_group/'), 100)
                                                                });

                                                            }
                                                        })
                                                    }
                                                } else {
                                                    // alert('คุณได้ทำการเข้าแชร์ของคุณเอง')
                                                    firebase.auth().onAuthStateChanged((user) => {
                                                        if (user) {
                                                            firebase.database().ref(`/users/${user.uid}`).once('value').then(function (snapshot) {
                                                                let dataJ = (snapshot.val());
                                                                joinGroupShare(key, user.uid, dataJ)
                                                                setTimeout(() => router.push('/share_group/'), 100)
                                                            });
                                                        }
                                                    })
                                                }

                                            });
                                        }

                                    })
                                })
                            }
                        })

                    }}
                >
                    <SearchBar >
                        <SearchMap onClick={handleDrawerOpen} map={map} {...props} />
                    </SearchBar>
                    {statusShare === true
                        ? (<Link href="/share_group" >
                            <Fab color="primary" aria-label="add" className={classes.fab}>
                                <GroupIcon />
                            </Fab>
                        </Link>)
                        : (<Link href="/share_location" >
                            <Fab color="primary" aria-label="add" className={classes.fab}>
                                <AddIcon />
                            </Fab>
                        </Link>)
                    }

                </Map>
            </div>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose} style={{ position: "absolute" }}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    <div>
                        <Grid container justify="center" alignItems="center">
                            <Avatar alt="Remy Sharp" src={users.photoURL} className={classes.bigAvatar} />
                        </Grid>
                        <center style={{ marginBottom: '10px' }}>
                            <span>{users.displayName}</span>
                        </center>
                    </div>
                </div>
                <Divider />
                <List>
                    <Link href="/profile">
                        <ListItem button key={0}>
                            <ListItemIcon> <AccountBoxIcon /></ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItem>
                    </Link>
                    <Link href="/history">
                        <ListItem button key={1}>
                            <ListItemIcon> <HistoryIcon /></ListItemIcon>
                            <ListItemText primary="History" />
                        </ListItem>
                    </Link>
                </List>
                <div style={{
                    position: "absolute",
                    bottom: 0,
                    width: '-webkit-fill-available'
                }}>
                    <Button
                        onClick={Logout}
                        variant="contained"
                        color="primary"
                        // className={classes.button}
                        style={{
                            width: '-webkit-fill-available',
                            height: '56px',
                            borderRadius: '0px'
                        }}>Logout</Button>
                </div>
            </Drawer>
        </Fragment>
    )

}




export default ConnectApiMaps({
    apiKey: "AIzaSyCfdx1_dkKY9BejzU-We23YqfEynZtAIJc",
    libraries: ['places', 'geometry'],
})(Private)