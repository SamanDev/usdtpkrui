import React from "react";
import { Button, Divider } from "semantic-ui-react";
import AuthFormikControl from "../../../components/form/FormikControl";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { registerService } from "../../../services/auth";
import { MyToast } from "../../../utils/myAlert";
import Trans from "../../../utils/getword";



const onSubmit = async (values, submitMethods) => {
  const res = await registerService(values);
  if (res.status == 200) {
    if (res.data.accessToken) {
      submitMethods.resetForm();
      MyToast("انجام شد", "success");
    }
  }
  submitMethods.setSubmitting(false);
};

const depositArea = (prop) => {
  const loginToken = prop.loginToken;
  var validationSchema = Yup.object({
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
        email: "",
        password: "",
        newPassword: "",

        refer: loginToken?.username,
      }}
      onSubmit={(values, submitMethods) => onSubmit(values, submitMethods)}
      validationSchema={validationSchema}
    >
      {(formik) => {
        return (
          <Form>
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
              <Button
                content={Trans("register")}
                fluid
                type="submit"
                style={{ margin: "10px 0" }}
                disabled={formik.isSubmitting}
                loading={formik.isSubmitting}
                className="farsi"
                color="red"
            
              />
          </Form>
        );
      }}
    </Formik>
  );
};

export default depositArea;
