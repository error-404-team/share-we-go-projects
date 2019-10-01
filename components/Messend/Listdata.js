import React from 'react'
import { withStyles } from '@material-ui/styles';
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
        borderTopRightRadius: '20px',
        borderTopLeftRadius: '20px',
        // borderBottomRightRadius: '0px',
        // borderBottomLeftRadius: '0px',
        position: 'fixed',
        bottom: '17%',
        left: '8%',
        width: '77%',
        height: '70%',
        overflow: 'auto',
    },


}

class ListData extends React.Component {

    render() {
        const { classes, listMsg, uid } = this.props

        // Object.keys(listMsg).map((key,index)=> console.log(listMsg[key].msg))
        return (
            <div>
                <div className={classes.InpuChatButton}>
                    <button
                        style={{
                            border: '0px solid #ffffff00',
                            backgroundColor: '#3f51b5',
                            position: 'fixed',
                            bottom: '480px',
                            height: '77px',
                            width: '77%',
                            right: '15%',
                            // borderTopLeftRadius: '18px',
                            // borderTopRightRadius: '18px',
                        }}>
                        {/* <InsertEmoticonOutlinedIcon>
                            </InsertEmoticonOutlinedIcon> */}
                        <span>สมาชิก</span>
                    </button>
                    <div style={{
                        padding: '10px 15px',
                        marginTop: '28%'

                    }}>
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
                                                    borderRadius: '5px',
                                                    float: 'right'
                                                }}>
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
                                                    <Chip
                                                        key={key}
                                                        avatar={<Avatar alt="Natacha" src={listMsg[key].photoURL} />}
                                                        label={(
                                                            <div>
                                                                <h3>{listMsg[key].displayName}</h3>
                                                                <p>{listMsg[key].msg}</p>
                                                            </div>
                                                        )}
                                                    />
                                                </div>
                                            </React.Fragment>
                                        }
                                    </React.Fragment>
                                ))
                                }
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
            </div>

        )
    }
}

// export default ListData;
export default withStyles(Styeles)(ListData);