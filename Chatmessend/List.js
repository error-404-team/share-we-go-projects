import React from 'react'
import { withStyles } from '@material-ui/styles';
// import TEST from '../Img/TEST.jpg'

const Styeles ={ 
    OverScroll:{
        // backgroundColor:'skyblue',
        // border:'0px',
        // borderRadius:'4px',
        // float:'right'
    },
    InpuChatButton: {
            padding: '10px 15px',
            backgroundColor: '#ffffff00',
            borderTop: '0px solid #ddd',
            // borderBottomRightRadius: '0px',
            // borderBottomLeftRadius: '0px',
            position: 'fixed',
            bottom: '7%', 
            right:'3px',
            width:'65%',  
        },
    

}

const ListData = (props) => {
const {classes} = props
    return (
        <div className={classes.InpuChatButton}>
            <img/>
            {/* </img> */}
        {/* <div> */}
            {
                props.listMsg.map( msg =>{
                    return <p 
                        style={{
                        backgroundColor:'#1C3657',
                        padding:'inherit',
                        // textOverflow:'clip',
                        float:'right',
                        color:'white',
                        clear:'both',
                        borderTopLeftRadius:'18px',
                        borderBottomLeftRadius:'18px',
                        borderBottomRightRadius:'18px',
                    }}
                        key = { msg.key }>{ msg.message }</p>
                    // </button>
                }) 
            }
        {/* </div>
             <div> */}

             </div>
    )

}

// export default ListData;
export default withStyles(Styeles)(ListData);