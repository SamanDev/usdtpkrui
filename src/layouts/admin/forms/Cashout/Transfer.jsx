import React, { useState } from "react";

import CashoutButton from "../../input/CashoutButton";
import FormikControl from "../../../../components/form/FormikControl";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { cashierService } from "../../../../services/cashier";
import { getCashAmount, doCurrency } from "../../../../const";
import { Alert } from "../../../../utils/alerts";
import AnimIcon from "../../../../utils/inviteIcon";
import { Button, Progress, Label } from "semantic-ui-react";
import Trans from "../../../../utils/getword";

const onSubmit = async (values, submitMethods, navigate, prop, setRefresh) => {
  //submitMethods.resetForm();
  //return false;
  try {
    const res = await cashierService(values, "transferChip", "");
    if (res.status == 200) {
      if (res.data?.accessToken) {
        submitMethods.resetForm();
        //etRefresh(true);
        //submitMethods.setSubmitting(false);
        //Alert("Done", "انجام شد.", "success");
      }
    } else {
      Alert("متاسفم...!", res.data.message, "error");
    }
  } catch (error) {
    submitMethods.setSubmitting(false);

    Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
  }
};

const depositArea = (prop) => {
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const loginToken = prop.loginToken;
  const validationSchema = Yup.object({
    amount: Yup.number()
      .required("لطفا این فیلد را وارد کنید.")
      .min(100000, "حداقل مبلغ " + doCurrency(100) + " تومان می باشد.")
      .max(loginToken.balance, "موجودی ناکافی است.")
      .integer(),

    transferUser: Yup.string()
      .required(Trans("req_minUser"))
      .min(3, Trans("req_minUser"))
      .max(12, Trans("req_maxUser")).matches(
        /^[a-zA-Z0-9]+$/,
        Trans("req_mustUser")
      ),
    password: Yup.string()
      .required(Trans("req_minPass"))
      .min(8, Trans("req_minPass")),
  });

  return (
    <Formik
      initialValues={{
        amount: 100,
        amount2: doCurrency("100"),
        transferUser: "",
        username: "",
        password: "",
      }}
      onSubmit={(values, submitMethods) =>
        onSubmit(values, submitMethods, navigate, prop, setRefresh)
      }
      validationSchema={validationSchema}
    >
      {(formik) => {
        return (
          <Form>
            <div
              className="fadeout"
              style={{ height: 100, position: "relative" }}
            >
              <div
                style={{
                  position: "absolute",
                  zIndex: 0,
                  top: -15,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <AnimIcon
                  icon="ssdupzsv"
                  width="200px"
                  height="150px"
                  trigger="loop"
                  colors="primary:#545454,secondary:#916f10"
                />
              </div>
            </div>
            <span className="hiddenmenu">
              <FormikControl
                formik={formik}
                control="amount"
                label={Trans("amount")}
                className="farsi"
                name="amount"
                labelcolor={prop.labelcolor}
                size={prop.size}
              />
            </span>
            {formik.errors["amount"] && (
              <Label
                className="farsi"
                basic
                color="red"
                pointing="below"
                size={prop.size}
              >
                {formik.errors["amount"]}
              </Label>
            )}
            <FormikControl
              formik={formik}
              type="text"
              control="input"
              label={Trans("amount")}
              name="amount2"
              labelcolor={prop.labelcolor}
              size={prop.size}
              inputmode="numeric"
            />
            <FormikControl
              formik={formik}
              control="input"
              type="text"
              name="transferUser"
              labelcolor="black"
              size={prop.size}
              label={Trans("transferto")}
              autoComplete="transferUser"
            />
            <span style={{ position: "absolute", opacity: 0, zIndex: -1 }}>
              <FormikControl
                formik={formik}
                control="input"
                type="text"
                name="username"
                labelcolor={prop.labelcolor}
                size={prop.size}
                autoComplete="username"
                readOnly={true}
                defaultValue={loginToken?.username}
                disabled={formik.errors ? true : false}
              />
            </span>
            <FormikControl
              formik={formik}
              control="input"
              type="password"
              name="password"
              label={Trans("password")}
              labelcolor="red"
              size={prop.size}
              autoComplete="password"
            />

            <CashoutButton
              {...prop}
              val={Trans("transfer")}
              disabled={formik.isSubmitting}
              loading={formik.isSubmitting}
              refresh={refresh}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default depositArea;
