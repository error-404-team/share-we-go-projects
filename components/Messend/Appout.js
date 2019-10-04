import React from 'react'
import InputData from './Inputdata'
import ListData from './Listdata'
import firebase from 'firebase'
import config from '../../lib/firebase'

// firebase.initializeApp(Config)

class Appout extends React.Component {

    state = {
        displayName: null,
        listMsg: ['']
    };

    constructor(props) {
        super(props)
        var that = this;
        firebase.database().ref('message').on('value', function (snapshot) {
            if (snapshot.val() != null) {
                that.setState({
                    listMsg: snapshot.val()
                })
            }
        });
    }


    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // set user display name
                this.setState({
                    displayName: user.displayName
                })
            }
        });
    }

    onClickButtonHandlerData = (msg) => {
        // check message
        if (!msg) return;

        const listMsgData = this.state.listMsg.concat({
            key: Math.random().toString().replace('.', ''),
            message: msg,
            displayName: this.state.displayName
        });
        firebase.database().ref('message/').set(listMsgData);
    }


    render() {

        console.log(this.state.listMsg);

        const listMsg = this.state.listMsg.map(msg => {
            return <p>{msg.message}</p>
        });


        return (
            <div>
                <ListData data={this.state}/>
                <InputData onClickButtonHandler={this.onClickButtonHandlerData}/>
            </div>
        );
    }
}

export default Appout;
