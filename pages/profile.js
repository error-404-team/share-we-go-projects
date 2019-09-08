import React from 'react';
import ImageAvatars from "../components/midaiprofile";
import Personalform from "../components/personalInformation";
import BarAppShere from "../components/barappshere";

function profile() {
    return (

        <React.Fragment>
            <BarAppShere></BarAppShere>
            <ImageAvatars></ImageAvatars>
            <Personalform></Personalform>
        </React.Fragment>

    );
}
export default profile;
