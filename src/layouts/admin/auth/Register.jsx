import React, { useState } from "react";
import { Header, Divider, Button, Segment } from "semantic-ui-react";
import AuthFormikControl from "../../../components/authForm/AuthFormikControl";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import MyMsg from "../../../utils/MsgDesc";
import Trans from "../../../utils/getword";
import GoogleLogin from "../../../utils/loginGoogle";

import { registerService } from "../../../services/auth";

const onSubmit = async (values, submitMethods, navigate, prop) => {
  const res = await registerService(values);
  if (res.status == 200) {
    if (res.data.accessToken) {
      prop.setSecondOpen(false);
      prop.setIsUser(true);
      localStorage.setItem(btoa(values.username), btoa(values.password));
      localStorage.removeItem("email");
        localStorage.removeItem("refer");
    }
  }
  submitMethods.setSubmitting(false);
};

const depositArea = (prop) => {
  var reffer = localStorage.getItem("refer");
  var email = localStorage.getItem("email")!=null?localStorage.getItem("email"):"";

  const [depMode, setDepMode] = useState(false);
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    username: Yup.string()
  
      .required(Trans("req_minUser"))
      .min(3, Trans("req_minUser"))
      .max(12, Trans("req_maxUser"))
      .matches(
        /^[a-zA-Z0-9]+$/,
        Trans("req_mustUser")
      ),
    email: Yup.string()
    .required(Trans("req_email"))
    .email(Trans("req_email")),
    password: Yup.string()
      .required(Trans("req_minPass"))
      .min(8, Trans("req_minPass"))
  
      .matches(/(?=.*\d)/, Trans("req_havenumPass"))
  
      .matches(/((?=.*[A-Z]){1})/, Trans("req_havewordPass"))
      .matches(/(?=.*\W)/, Trans("req_havesignPass")),
    newPassword: Yup.string()
  
      .required(Trans("req_minPass"))
  
      .oneOf([Yup.ref("password"), null], Trans("req_notmatchPass")),
  });
  return (
    <Formik
      initialValues={{
        username: "",
        email: email!=null?email:"",
        password: "",
        newPassword: "",
        refer: reffer,
      }}
      onSubmit={(values, submitMethods) =>
        onSubmit(values, submitMethods, navigate, prop)
      }
      validationSchema={validationSchema}
    >
      {(formik) => {
        return (
          <Form>
            <Segment
              inverted
              padded="very"
              className="fadeout"
              style={{
                paddingBottom: 300,

                boxShadow: "0 40px 50px rgba(81,88,95,.6549019607843137)",
              }}
            >
              <Header as="h2" inverted className="farsi">{Trans("registerheader")}</Header>
              <Divider hidden />

              <MyMsg
                icon=""
                color="black"
                text={
                  <>
                    {Trans("registerslogan")}
                    {reffer && (
                      <>
                        <br /><br />
                        {Trans("registerby")}: <b className="text-gold">
                          {reffer}
                        </b>
                      </>
                    )}
                  </>
                }
              />
              <Divider inverted />
             
              {email.indexOf("@")==-1&&<><GoogleLogin  formik={formik}/>
                <Divider inverted  horizontal>Or</Divider></>}
              
              <AuthFormikControl
                formik={formik}
                control="input"
                type="text"
                name="username"
                label={Trans("username")}
                labelcolor={prop.labelcolor}
                size={prop.size}
                maxLength="12"
                autoComplete="username"
              />
           
              {email!=null &&email.indexOf("@")>-1?<AuthFormikControl
                formik={formik}
                control="input"
                type="email"
                name="email"
                label={Trans("email")}
                labelcolor={prop.labelcolor}
                size={prop.size}
                autoComplete="email"
                disabled={true}
               
              />:<AuthFormikControl
              formik={formik}
              control="input"
              type="email"
              name="email"
              label={Trans("email")}
              labelcolor={prop.labelcolor}
              size={prop.size}
              autoComplete="email"
             
            />}
              

              <Divider inverted />
              <AuthFormikControl
                formik={formik}
                control="input"
                type="password"
                name="password"
                autoComplete="new-password"
                label={Trans("password")}
                labelcolor={prop.labelcolor}
                size={prop.size}
              />
              <AuthFormikControl
                formik={formik}
                control="input"
                type="password"
                name="newPassword"
                label={Trans("passwordRepeat")}
                labelcolor={prop.labelcolor}
                autoComplete="new-password"
                placeholder="Repeat Password"
                size={prop.size}
              />
              <Button
                content={Trans("register")}
                fluid
                type="submit"
                style={{ margin: "10px 0" }}
                disabled={formik.isSubmitting}
                loading={formik.isSubmitting}
                className="farsi"
                color="orange"
                size="huge"
              />
            </Segment>
          </Form>
        );
      }}
    </Formik>
  );
};

export default depositArea;
