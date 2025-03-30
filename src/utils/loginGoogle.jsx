import React from "react";

import { GoogleLogin } from '@react-oauth/google';
import { loginService } from "../services/auth";

const onSubmit = async (values) => {
    try {
        var _newValues = values;
       

        const res = await loginService(_newValues);
        if (res.status == 200) {
            if (res.data.accessToken) {
                if (res.data.userBlock) {
                    Alert("متاسفم...!", "اکانت شما مسدود می باشد.", "error");
                } else {
                    localStorage.removeItem("oldgalaxyUserkey");
                    prop.setIsUser(true);
                    prop.setFirstOpen(false);


                    //window.location.reload();
                }
            }
        }
        
    } catch (error) {
       

    }
};

function SegmentExamplePlaceholderInline(prop) {
    return (
        <>
           

<GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse.credential);
    onSubmit({credential:credentialResponse.credential});
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>;
               
        </>
    );
}

export default SegmentExamplePlaceholderInline;
