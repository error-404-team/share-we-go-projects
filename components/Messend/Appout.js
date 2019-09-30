import React from 'react'
import InputData from './Inputdata'
import ListData from './Listdata'
import firebase from 'firebase'
import config from '../../lib/firebase'
// firebase.initializeApp(Config)

class Appout extends React.Component {
  
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
    const listMsg = this.state.listMsg.map( msg => {
      return <p>{msg.message}</p>
    })
    return (
      <div>
        <ListData
            listMsg = {this.state.listMsg} />
        <InputData 
            onClickButtonHandler = {this.onClickButtonHandlerData}
        />
      </div>
    );
  }
}

export default Appout;