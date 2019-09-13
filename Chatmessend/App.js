import React from 'react'
import InputData from './Input'
import ListData from './List'
import firebase from 'firebase'
import { Config } from './config'
import AppII from './Appbar'
// import Popup from './Popup/popup'
firebase.initializeApp(Config)

class App extends React.Component {
  
  state = { listMsg: [''] }

  constructor(props) {
    super(props)
    var that  = this;
    firebase.database().ref('message').on('value', function(snapshot) {
      if(snapshot.val() != null) { 
         that.setState({
          listMsg:snapshot.val()
         })
       }
    });
  }

  onClickButtonHandlerData = (msg) => {
    const listMsgData = this.state.listMsg.concat({
      key: Math.random().toString().replace('.',''),
      message: msg
     })
    firebase.database().ref('message/').set(listMsgData);
  }


  render() {
    // const listMsg = this.state.listMsg.map( msg => {
    //   return <h4>{msg.message}</h4>
    // })
    return (
      <div>
        {/* <Popup></Popup> */}
        <AppII></AppII>
        <ListData
            listMsg = {this.state.listMsg} />
        <InputData 
            onClickButtonHandler = {this.onClickButtonHandlerData}
        />
      </div>
    );
  }
}

export default App;
