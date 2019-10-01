import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
// import InsertEmoticonOutlinedIcon from '@material-ui/icons/InsertEmoticonOutlined';
// import EmojiPicker from 'emoji-picker-react';
// import { Button } from '@material-ui/core';
// import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

const Styeles = {
    InpuChatButton: {
        padding: '10px 15px',
        backgroundColor: '#F0F0F0',
        borderTop: '1px solid #ddd',
        // borderBottomRightRadius: '3px',
        // borderBottomLeftRadius: '20px',
        position: 'fixed',
        bottom: '10%',
        width: '77%',
        right:'15%'
    },
    InputInborder: {
        border: '1px solid gray',
        borderRadius: '13px',
        // position: 'absolute',
        width: '92%',
        height: '30px',

    }
}

class InputData extends Component {

    state = {
        msg: ""
    }
    onTextChange = (e) => {
        this.setState({
            msg: e.target.value
        })
    }
    // onEmojiClick =()=>{
    //     this.props.onEmojiClick(this.state.myCallback)
    // }

    onClickButton = () => {
        this.props.onClickButtonHandler(this.state.msg)
    }

    render() {
        const { classes } = this.props

        return (
            <div className={classes.InpuChatButton}>
                <div>
                    {/* <div > */}
                    <input
                        className={classes.InputInborder}
                        onChange={this.onTextChange}
                        value={this.state.msg}
                        // id="btn-input" 
                        // type="text" 
                        // className="form-control input-sm" 
                        placeholder="พิมพ์ข้อความ" ></input>
                    <span>
                        {/* <EmojiPicker onEmojiClick={this.myCallback}></EmojiPicker> */}
                        <button
                            style={{
                                border: '0px solid #ffffff00',
                                backgroundColor: '#ffffff00',
                                position: 'absolute',
                                 right: '0%',
                                 bottom: '18%'
                            }}
                            onClick={this.onClickButton}>
                            <SendRoundedIcon  ></SendRoundedIcon></button>
                    </span>
                </div>
            </div>
        )
    }
}
export default withStyles(Styeles)(InputData);