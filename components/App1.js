import React from 'react';
// import { bool } from 'prop-types';
import m1 from '../../my-app/src/image/m1.png'
import m21 from '../../my-app/src/image/m21.png'
import m31 from '../../my-app/src/image/m31.png'

class App1 extends React.Component{
  render() {
    return (
      
        <div>
            <body bgcolor= "dddddd" >
          <h4 align = 'center'>เบอร์ติดต่อ</h4>
          </body>
          
            <body>
            <h4 align='middle'align='right'> <img src={m1} border="0" width="200" height="25"  vspace="0" hspace="40"></img>< a href="tel:0865425625">โทร:086-542-5625</a> </h4>
             <h5 align='right'>(ค่าบริการ 20 บาท)</h5>
             <hr size="1" width="400"></hr> 

             <h4 align='middle'align='right'> <img src={m21} border="0" width="200" height="25"  vspace="0" hspace="40"></img>< a href="tel:1681">โทร:1681</a></h4>
             <h5 align='right'>(ค่าบริการ 20 บาท)</h5>
             <hr size="1" width="400"></hr>
             
             <h4 align='middle' align='right'><img src={m31} border="0" width="200" height="25" vspace="0" hspace="55"></img>< a href="tel:020189799">โทร:0-2018-9799</a></h4>
             <h5 align='right'>(ค่าบริการ 40 บาท)</h5>

             <body bgcolor= "dddddd"> 
          <h4 align = 'center'>ข้อมูลคนขับ</h4>
          </body>

          <body>
          <h4 align = 'center'>ชื่อผู้ขับขี่</h4>
            <h4 align = 'center'><input type= "bod" name= "bob1" id= "bod2" size= "24"></input></h4>
            <h4 align = 'center'>ป้ายทะเบียนรถยนต์</h4>
              <h4 align = 'center'><input type= "bod" name= "bob1" id= "bod2" size= "24"></input></h4> 

              <form>
                <h2 align ='center'>
                <input type= "submit" value= "บันทึก"></input>
                </h2>
              </form>
              </body>
             </body>
           
          
                
        </div>
        
      
    )
  } 
}


export default App1 ;
