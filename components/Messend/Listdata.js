import React from 'react'
import {withStyles} from '@material-ui/styles';
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
        position: 'fixed',
        bottom: '17%',
        left: '8%',
        width: '77%',
        height: '70%',
        overflow: 'auto',
    },


}

const ListData = (props) => {
    const {classes} = props;

    return (
        <div>

            <div className={classes.InpuChatButton}>
                <button
                    style={{
                        border: '0px solid #ffffff00',
                        backgroundColor: '#3f51b5',
                        height: '77px',
                        width: '100%',
                        right: '15%',
                        color: 'white',
                        fontSize: '18px'
                        // borderTopLeftRadius: '18px',
                        // borderTopRightRadius: '18px',
                    }}>


                    {/* <InsertEmoticonOutlinedIcon>
                            </InsertEmoticonOutlinedIcon> */}
                    <span>
                    สมาชิก
                            </span>
                </button>

                <div style={{
                    padding: '10px 15px',
                }}>
                    {
                        props.data.listMsg.map(msg => {

                            if(msg){
                                return <div style={{clear: 'both'}}>
                                    <div style={{
                                        float: 'right',
                                        padding: '15px',
                                        marginBottom: '15px',
                                        backgroundColor: '#c8c8c8',
                                        color: 'black',
                                        borderRadius: '4px'
                                    }}
                                         key={msg.key}>
                                        <div>{msg.displayName ? msg.displayName : null}</div>
                                        {msg.message}
                                    </div>
                                </div>
                            }


                        })
                    }
                </div>

            </div>
        </div>

    )

}

// export default ListData;
export default withStyles(Styeles)(ListData);
