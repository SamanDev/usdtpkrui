import React, { useState } from "react";
import { Header, Divider, Button, Segment } from "semantic-ui-react";
import AuthFormikControl from "../../../components/authForm/AuthFormikControl";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "../../../utils/alerts";
import { forgetPasswordService } from "../../../services/auth";
import MyMsg from "../../../utils/MsgDesc";
import Trans from "../../../utils/getword";
import { MyConfirm, MyToast, MyDeposit, MyToastDone } from "../../../utils/myAlert";


const initialValues = {
  email: "",
  password: "",
  newPassword: "",
};

const onSubmit = async (values, submitMethods, navigate) => {
  try {
    const res = await forgetPasswordService(values);
    if (res.status == 200) {
      MyToastDone(Trans("passlinksent"), "success");
      submitMethods.resetForm();
    } else {
      MyToast(Trans("emailnotfound"), "error");
      //Alert("متاسفم...!", res.data.message, "error");
    }
    submitMethods.setSubmitting(false);
  } catch (error) {
    submitMethods.setSubmitting(false);
    //Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
  }
};

const depositArea = (prop) => {
  const [depMode, setDepMode] = useState(false);
  const navigate = useNavigate();
  
  const validationSchema = Yup.object({
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
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, submitMethods) =>
        onSubmit(values, submitMethods, navigate, prop)
      }
    >
      {(formik) => {
        return (
          <Form>
            <Segment
              inverted
              padded="very"
              className="fadeout"
              style={{
                paddingBottom: 200,

                boxShadow: "0 40px 50px rgba(81,88,95,.6549019607843137)",
              }}
            >
              <Header as="h2" inverted className="farsi">
              {Trans("forgetpassheader")}              </Header>
              <Divider hidden />

              
             <AuthFormikControl
              formik={formik}
              control="input"
              type="email"
              name="email"
              label={Trans("email")}
              labelcolor={prop.labelcolor}
              size={prop.size}
              autoComplete="email"
             
            />
              

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
              <Divider inverted />
              <MyMsg
                icon="unlock"
                color="red"
                text={Trans("forgetpassslogan")}
              />

              <Button
                content={Trans("sendLink")}
                fluid
                type="submit"
                size="huge"
                style={{ margin: "10px 0" }}
                disabled={formik.isSubmitting}
                loading={formik.isSubmitting}
                className="farsi"
                color="orange"
              />
            </Segment>
          </Form>
        );
      }}
    </Formik>
  );
};

export default depositArea;
