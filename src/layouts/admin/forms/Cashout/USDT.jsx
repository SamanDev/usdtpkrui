import React, { useState } from "react";

import CashoutButton from "../../input/CashoutButton";
import FormikControl from "../../../../components/form/FormikControl";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "../../../../utils/alerts";
import { cashierService } from "../../../../services/cashier";
import { doCurrency } from "../../../../const";
import Trans from "../../../../utils/getword";

import AddSchema from "../../../../utils/schema";
import { Button, Progress,Icon, Divider,Label } from "semantic-ui-react";
import DollarSelect from "../../../../components/form/dollarSelect";
import ShowAmount from "../../../../utils/ShowAmount";

var amounts = [
  { value: 50 },
  { value: 100 },
  { value: 200 },
  { value: 300 },
  { value: 500 },
  { value: 1000 },
  { value: 2500 },
  { value: 5000 },
  { value: 10000 },
  { value: 25000 },
  { value: 50000 },
  { value: 100000 },

];
const onSubmit = async (values, submitMethods, navigate, prop, setRefresh) => {
  try {
    const res = await cashierService(values, "nowPayments", "");
    if (res.status == 200) {
      Alert("Done", "انجام شد.", "success");
      setRefresh(true);
    }
    submitMethods.setSubmitting(false);
  } catch (error) {
    submitMethods.setSubmitting(false);

   // Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
  }
};

const depositArea = (prop) => {
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const loginToken = prop.loginToken;
  const siteInfo = prop.siteInfo;
  const [getRate, setGetRate] = useState(
    localStorage.getItem("getRate") || 50000
  );
  var validationSchema = Yup.object({
    amount: Yup.number()
      .required("لطفا این فیلد را وارد کنید.")
      .min(
        getRate * siteInfo.cashoutLimitDollar,
        "حداقل مبلغ " +
          doCurrency(getRate * siteInfo.cashoutLimitDollar) +
          " تومان می باشد."
      )
      .max(loginToken.balance, "موجودی ناکافی است.")
      .integer(),

    amountDollar: Yup.number()
      .required("لطفا این فیلد را وارد کنید.")
      .min(
        siteInfo.cashoutLimitDollar,
        "حداقل مبلغ " + siteInfo.cashoutLimitDollar + " دلار می باشد."
      ),
    userWalletAddress: Yup.string()
      .required("لطفا این فیلد را وارد کنید.")
      .min(10, "لطفا این فیلد را درست وارد کنید."),
    
  });
  validationSchema = AddSchema(validationSchema,"password");
  var _bal = loginToken.balance;
  return (
    <Formik
      initialValues={{
        amount: 0,

        action: "payout",
        usd: false,
        coin: "USDT.TRC20",
        amountDollar: 0,
        userWalletAddress: "",
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
             <div className="amountgroup" style={{height:240}}>
                            {amounts.map((amo, i) => {
                                return (
                                    <Button
                                        type="button"
                                        key={amo.value}
                                      
                                        className="farsi"
                                        color={formik.values.amount == amo.value ? "red" : "black"}
                                        onClick={() => {
                                            formik.setFieldValue("amount", amo.value);
                                        }}
                                        disabled={
                                          loginToken.balance < amo.value ? true : false
                                        }
                                    ><ShowAmount amount={amo.value} color={true} />
                                  
                                       
                                    </Button>
                                );
                            })}
                        </div>
             
             <Divider/>
            <FormikControl
              formik={formik}
              control="input"
              type="text"
              name="userWalletAddress"
              label="TRC20 Wallet"
              labelcolor="red"
              size={prop.size}
              autoComplete="trc20-wallet"
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
              autoComplete="password"
              labelcolor="red"
              size={prop.size}
            />

            <CashoutButton
              {...prop}
              disabled={formik.isSubmitting || formik.values.amount==0}
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
