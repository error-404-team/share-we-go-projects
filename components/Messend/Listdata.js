import React from 'react'
import {withStyles} from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
// import TEST from '../Img/TEST.jpg'
// import Img from '../Messend/Photo/Img.jpeg'


const Styeles = {
    OverScroll: {
        // backgroundColor:'skyblue',
        // border:'0px',
        // borderRadius:'4px',
        // float:'right'
    },
    InpuChatButton: {

        backgroundColor: 'white',
        // borderTop: '0px solid #ddd',
        // borderTopRightRadius: '20px',
        // borderTopLeftRadius: '20px',
        // borderBottomRightRadius: '0px',
        // borderBottomLeftRadius: '0px',
        position: 'fixed',
        bottom: '17%',
        left: '8%',
        width: '77%',
        height: '58%',
        overflow: 'scroll',
    },


}


class ListData extends React.Component {
    constructor(props) {
        super(props);

    }


    // scroll to last message
    componentDidUpdate(){
        const element = document.getElementById('bottom');
        element.scrollIntoView({behavior: 'smooth'});
    }

    render() {
        const {classes, listMsg, uid} = this.props

        // Object.keys(listMsg).map((key,index)=> console.log(listMsg[key].msg))
        return (
            <div>
                <div className={classes.InpuChatButton}>
                    <button
                        style={{
                            border: '0px solid #ffffff00',
                            backgroundColor: '#3f51b5',
                            bottom: '480px',
                            height: '77px',
                            width: '100%',

                            // borderTopLeftRadius: '18px',
                            // borderTopRightRadius: '18px',
                        }}>
                        {/* <InsertEmoticonOutlinedIcon>
                            </InsertEmoticonOutlinedIcon> */}
                        <span>สมาชิก</span>
                    </button>

                    {listMsg !== null
                        ? <React.Fragment>
                            {Object.keys(listMsg).map(key => (
                                <React.Fragment key={key}>
                                    {listMsg[key].uid === uid
                                        ? <React.Fragment key={key}>
                                            <div style={{
                                                bottom: '14%',
                                                padding: 'inherit',
                                                padding: '10px 15px',
                                                clear: 'both',
                                                borderRadius: '5ypx',
                                                float: 'right'
                                            }}>
<<<<<<< HEAD
                                                <Chip
                                                    key={key}
                                                    // avatar={<Avatar alt="Natacha" src={listMsg[key].photoURL} />}
                                                    label={(
                                                        <div>
                                                            {/* <h3>{listMsg[key].displayName}</h3> */}
                                                            <p>{listMsg[key].msg}</p>
                                                        </div>
                                                    )}
                                                />
=======

                                                <div style={{clear: 'both'}}>
                                                    <div style={{
                                                        float: 'right',
                                                        padding: '8px',
                                                        backgroundColor: '#c8c8c8',
                                                        color: 'black',
                                                        borderRadius: '4px'
                                                    }}
                                                         key={key}>
                                                        <div>{listMsg[key].msg}</div>
                                                    </div>
                                                </div>


>>>>>>> 40d5228612f76eb2ea748e7f6e96b4876f9b2be0
                                            </div>
                                        </React.Fragment>
                                        : <React.Fragment key={key}>
                                            <div style={{
                                                bottom: '14%',
                                                padding: 'inherit',
                                                padding: '10px 15px',
                                                clear: 'both',
                                                borderRadius: '5px',
                                                float: 'left'
                                            }}>
<<<<<<< HEAD
                                                <Chip
                                                    key={key}
                                                    avatar={<Avatar alt="Natacha" src={listMsg[key].photoURL}/>}
                                                    label={(
                                                        <div>
                                                            <h3>{listMsg[key].displayName}</h3>
                                                            <p>{listMsg[key].msg}</p>
                                                        </div>
                                                    )}
                                                />
=======

                                                <div style={{clear: 'both'}}>
                                                    <Avatar alt="Natacha" src={listMsg[key].photoURL}/>
                                                    <div style={{
                                                        float: 'right',
                                                        padding: '8px',
                                                        backgroundColor: '#c8c8c8',
                                                        color: 'black',
                                                        borderRadius: '4px'
                                                    }}
                                                         key={key}>

                                                        <div>
                                                            <h3>{listMsg[key].displayName}</h3>
                                                            <div>{listMsg[key].msg}</div>
                                                        </div>


                                                    </div>
                                                </div>


>>>>>>> 40d5228612f76eb2ea748e7f6e96b4876f9b2be0
                                            </div>
                                        </React.Fragment>
                                    }

                                </React.Fragment>
                            ))
                            }

                            <React.Fragment>
                                <div  id='bottom' style={{clear: 'both',}}>
                                </div>
                            </React.Fragment>

                        </React.Fragment>
                        : <React.Fragment>
                            <center>
                                <p style={{
                                    padding: 'inherit',
                                    clear: 'both',
                                }}>พิมพ์ข้อความลงไปเพื่สนทนาตอบโต้</p>
                            </center>
                        </React.Fragment>
                    }


                </div>
            </div>

        )
    }
}

// export default ListData;
export default withStyles(Styeles)(ListData);
