import React from 'react';
import ImageAvatars from "../components/midaiprofile";
import Personalform from "../components/personalInformation";
import BarAppShere from "../components/barappshere";
import BottonEdit from "../components/bottonEdit";
function profile() {
    return (

        <React.Fragment>
            <BarAppShere></BarAppShere>
            <div>
            <ImageAvatars></ImageAvatars><BottonEdit></BottonEdit>
            </div>
            <Personalform></Personalform>
        </React.Fragment>

    );
}
export default profile;
