import React from 'react'
import InputData from './Inputdata'
import ListData from './Listdata'
import firebase from 'firebase'
import { writeMessenger } from '../../firebase-database/write-data';
import config from '../../lib/firebase'
// firebase.initializeApp(Config)

class Appout extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      listMsg: [''],
      uid: ''
    }

  }

  componentDidMount() {
    const me = this;
    firebase.auth().onAuthStateChanged((user) => {
      firebase.database().ref(`/group_share_user/`).once('value').then(function (snapshot) {
        var group_share_user = (snapshot.val());
        if (group_share_user !== null) {
          Object.keys(group_share_user).map((key) => {
            if (key !== user.uid) {
              firebase.database().ref(`/group_share_user/${key}/join/`).on('value', function (snapshot) {
                let joinKeys = (snapshot.val());
                if (joinKeys !== null) {
                  Object.keys(joinKeys).map((key) => {
                    if (key === user.uid) {
                      firebase.database().ref(`/group_share_user/${user.uid}/header`).on('value', function (snapshot) {
                        let joinHeaderKeys = (snapshot.val());
                        firebase.database().ref(`/group_share_user/${joinHeaderKeys.uid}/messengers`).on('value', function (snapshot) {
                          let dataMsg = (snapshot.val());
                          me.setState({
                            listMsg: dataMsg,
                            uid: user.uid
                          })
                        })
                      })
                    }
                  })
                }
              })

            } else {
              firebase.database().ref(`/group_share_user/${user.uid}`).once('value').then(function (snapshot) {
                let stories = (snapshot.val());
                if (stories.share === true) {
                  firebase.database().ref(`/group_share_user/${key}/messengers`).on('value', function (snapshot) {
                    let dataMsg = (snapshot.val());
                    me.setState({
                      listMsg: dataMsg,
                      uid: user.uid
                    })
                  })
                }
              })
            }
          })
        }
      })

    })
  }

  onClickButtonHandlerData = (msg) => {

    firebase.auth().onAuthStateChanged((user) => {
      firebase.database().ref(`/group_share_user/`).once('value').then(function (snapshot) {
        var group_share_user = (snapshot.val());
        if (group_share_user !== null) {
          Object.keys(group_share_user).map((key) => {
            if (key !== user.uid) {
              firebase.database().ref(`/group_share_user/${key}/join/`).on('value', function (snapshot) {
                let joinKeys = (snapshot.val());
                if (joinKeys !== null) {
                  Object.keys(joinKeys).map((key) => {
                    if (key === user.uid) {
                      firebase.database().ref(`/group_share_user/${user.uid}/header`).on('value', function (snapshot) {
                        let joinHeaderKeys = (snapshot.val());
                        firebase.database().ref(`/profile/${user.uid}`).once('value').then(function (snapshotData) {
                          let dataProfileUser = (snapshotData.val());

                          if (dataProfileUser !== null) {
                            let data = {
                              displayName: dataProfileUser.displayName,
                              photoURL: dataProfileUser.photoURL,
                              msg: msg,
                              uid: user.uid,
                              mid: Math.random().toString(36).substr(2, 9),
                              header: false
                            }
                            writeMessenger(joinHeaderKeys.uid, data)
                          } else {
                            firebase.database().ref(`/users/${user.uid}`).once('value').then(function (snapshotDataUser) {
                              let dataeUser = (snapshotDataUser.val());

                              let data = {
                                displayName: dataeUser.displayName,
                                photoURL: dataeUser.photoURL,
                                msg: msg,
                                uid: user.uid,
                                mid: Math.random().toString(36).substr(2, 9),
                                header: false
                              }
                              writeMessenger(joinHeaderKeys.uid, data)
                            })
                          }

                        })
                      })
                    }
                  })
                }
              });
            } else {
              firebase.database().ref(`/group_share_user/${user.uid}`).once('value').then(function (snapshot) {
                let stories = (snapshot.val());
                if (stories.share !== false) {
                  firebase.database().ref(`/profile/${user.uid}`).once('value').then(function (snapshot) {
                    let dataProfileUser = (snapshot.val());
                    let data = {
                      displayName: dataProfileUser.displayName,
                      photoURL: dataProfileUser.photoURL,
                      msg: msg,
                      uid: user.uid,
                      mid: Math.random().toString(36).substr(2, 9),
                      header: true
                    }
                    writeMessenger(user.uid, data)
                  })
                }
              })
            }
          })
        }
      })

    })
  }


  render() {
    // const listMsg = this.state.listMsg.map(msg => {
    //   return <p>{msg.message}</p>
    // })
    return (
      <div>
        <ListData
          listMsg={this.state.listMsg}
          uid={this.state.uid} />
        <InputData
          onClickButtonHandler={this.onClickButtonHandlerData.bind(this)}
        />
      </div>
    );
  }
}

export default Appout;