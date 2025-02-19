import React from "react";
import { doCurrency } from "../const";
import ShowAmount from "../utils/ShowAmount";

const LabelExampleBasic = (prop) => {
  try {
    if (prop.amount.toString().indexOf("-") > -1 || prop.sign < 0) {
      return (
        <span className="text-danger">-<ShowAmount amount={prop.amount*-1} color={true}/></span>
      );
    } else if (prop.amount.toString().indexOf("+") > -1 || prop.sign > 0) {
      return <span className="text-success">+<ShowAmount amount={prop.amount} color={true}/></span>;
    } else {
      return <span className={prop.className}><ShowAmount amount={prop.amount} color={true}/></span>;
    }
  } catch (error) {
    return prop.amount;
  }
};

export default LabelExampleBasic;
