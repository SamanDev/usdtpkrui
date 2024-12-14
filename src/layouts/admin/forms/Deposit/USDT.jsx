import React, { useState } from "react";

import DepositButton from "../../input/DepositButton";

import FormikControl from "../../../../components/form/FormikControl";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "../../../../utils/alerts";
import { cashierService } from "../../../../services/cashier";
import { getCashAmount, doCurrency } from "../../../../const";
import Trans from "../../../../utils/getword";

import { Button, Progress, Label,Icon } from "semantic-ui-react";

var amounts = [
  { value: 10 },
  { value: 25 },
  { value: 50 },
  { value: 100 },
  { value: 250 },
  { value: 500 },
  { value: 1000 },
  { value: 2500 },
  { value: 5000 },

];
const initialValues = {
  action: "payment",
  amount: 50,
  coin: "USDT.TRC20",
  amountDollar: 100,
  usd: false,
};

const onSubmit = async (values, submitMethods, navigate, prop, setRefresh) => {
  //values.dollarPrice = parseInt(values.amount / values.amountDollar);
  //values.amount = values.amountDollar;
  try {
    const res = await cashierService(values, "nowPayments", "");
    if (res.status == 200) {
      //localAmount(values, prop);
      window.location.href = res.data.replace(/ /g, "");

    
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
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, submitMethods) =>
        onSubmit(values, submitMethods, navigate, prop, setRefresh)
      }
     
    >
      {(formik) => {
        return (
          <Form>
           
            <Button.Group vertical fluid  type="button">
            {amounts.map((amo,i) => {
                 
                      return (
                    <Button
                      type="button"
                      key={amo.value}
                      icon labelPosition='right'
                      className="farsi"
                      color={
                        formik.values.amount == amo.value ? "red" : "grey"
                      }
                      onClick={() => {
                        formik.setFieldValue("amount", amo.value);
                      }}
                    
                    >
                     
                      {doCurrency(amo.value)}
                      <Icon className="usdbtn farsi">{Trans("unit")}</Icon>
             
                    </Button>
                  );
                  }
                
                )}
              </Button.Group>
      
            <DepositButton
              {...prop}
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