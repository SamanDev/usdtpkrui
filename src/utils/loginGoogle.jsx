import React from "react";

import { GoogleLogin } from "@react-oauth/google";
import { googleLoginService, loginService } from "../services/auth";



function SegmentExamplePlaceholderInline(prop) {
    

    const onSubmit = async (values) => {
       prop.formik.setSubmitting(true);
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
        } catch (error) {
            var myres = {
                "result": "error",
                "message": "loole.app@gmail.com"
            }
            if (error.response.data.message.indexOf("@") > -1) {
                localStorage.setItem("email", error.response.data.message);
                prop.formik.setSubmitting(false);
                //var reffer = localStorage.getItem("refer");
                //var email = error.response.data.message
                //navigate("/ref/"+email+"/"+reffer);
                prop.setFirstOpen(false);
                prop.setSecondOpen(true);
            }

        }
    };
    return (
        <>
            <GoogleLogin
                theme="filled_blue"
                size="large"
                text="continue_with"
                auto_select={false}
                onSuccess={(credentialResponse) => {
          
                    onSubmit({ credential: credentialResponse.credential });
                }}
                onError={() => {
                    prop.formik.setSubmitting(false);
                    console.log("Login Failed");
                }}
            />
        </>
    );
}

export default SegmentExamplePlaceholderInline;
