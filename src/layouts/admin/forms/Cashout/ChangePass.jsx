import React, { useState } from "react";
import { Divider } from "semantic-ui-react";
import FormikControl from "../../../../components/form/FormikControl";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "../../../../utils/alerts";
import { MyConfirm, MyToast, MyDeposit, MyToastDone } from "../../../../utils/myAlert";

import { forgetPasswordService } from "../../../../services/auth";
import MyMsg from "../../../../utils/MsgDesc";
import CashoutButton from "../../input/CashoutButton";
import Trans from "../../../../utils/getword";
const onSubmit = async (values, submitMethods, prop) => {
  try {
    const res = await forgetPasswordService(values);
    if (res.status == 200) {
    
        MyToastDone(Trans("passlinksent"), "success");
        submitMethods.resetForm();
        prop.closeMenu();
    } else {
      MyToast(Trans("emailnotfound"), "error");
    }
    submitMethods.setSubmitting(false);
  } catch (error) {
    submitMethods.setSubmitting(false);
   // Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
  }
};

const depositArea = (prop) => {
  const loginToken = prop.loginToken;
  try {
    var _email = loginToken.email;
  } catch (error) {
    var _email = "";
  }
  
  const initialValues = {
    password: "",
    newPassword: "",
    email: _email,
  };
  var validationSchema = Yup.object({
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
  
  const [depMode, setDepMode] = useState(false);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, submitMethods) =>
        onSubmit(values, submitMethods, prop)
      }
    >
      {(formik) => {
        return (
          <Form>
            <FormikControl
                formik={formik}
                control="input"
                type="password"
                name="password"
                autoComplete="new-password"
                label={Trans("password")}
                labelcolor={prop.labelcolor}
                size={prop.size}
              />
              <FormikControl
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

            
            <CashoutButton
              val={Trans("sendLink")}
              fluid
              style={{ margin: "10px 0" }}
              className="farsi"
              type="submit"
              color="olive"
              disabled={formik.isSubmitting}
              loading={formik.isSubmitting}
              {...prop}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default depositArea;
