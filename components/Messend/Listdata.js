import React from 'react'
import { withStyles } from '@material-ui/styles';
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

const ListData = (props) => {
    const { classes } = props
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
                <span>
                    
                    สมาชิก
                            </span>
            </button>
            <div style={{
                padding: 'inherit',
                padding: '10px 15px',

            }}>
                {
                    props.listMsg.map(msg => {
                        return <p
                            style={{
                                // backgroundColor: '#1C3657',
                                bottom: '14%',
                                padding: 'inherit',
                                padding: '10px 15px',
                                // position:'absolute',
                                // textOverflow:'clip',
                                // color: 'white',
                                clear: 'both',
                                borderRadius: '5px',
                                // width:'100%'
                                float: 'right',

                            }}
                            key={msg.key}>{msg.message}
                        </p>

                    })
                }
            </div>

        </div>
        </div>

    )

}

// export default ListData;
export default withStyles(Styeles)(ListData);