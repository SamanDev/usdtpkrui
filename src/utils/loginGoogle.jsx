import React from "react";

import { GoogleLogin } from "@react-oauth/google";
import { googleLoginService,loginService } from "../services/auth";

const onSubmit = async (values) => {
    try {
        var _newValues = values;
        _newValues.username = "directLogin"
        _newValues.password = "directLogin@17383"

        const res = await loginService(_newValues);
        if (res.status == 200) {
            if (res.data.accessToken) {
                if (res.data.userBlock) {
                    
                } else {
                    localStorage.removeItem("oldgalaxyUserkey");
                    prop.setIsUser(true);
                    prop.setFirstOpen(false);

                    //window.location.reload();
                }
            }
        }
    } catch (error) {}
};

function SegmentExamplePlaceholderInline(prop) {
    return (
        <>
            <GoogleLogin
            theme="filled_blue"
            size="large"
            text="continue_with"
            auto_select={false}
                onSuccess={(credentialResponse) => {
                    console.log(credentialResponse.credential);
                    onSubmit({ credential: credentialResponse.credential });
                }}
                onError={() => {
                    console.log("Login Failed");
                }}
            />
        </>
    );
}

export default SegmentExamplePlaceholderInline;
