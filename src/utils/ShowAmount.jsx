import React from "react";

import Trans from "./getword";
import { doCurrency } from "../const";

const ShowAmount = ({amount,color}) => {
  var getriz = parseFloat(amount).toFixed(2).toString().split(".")[1]

    return (
      <>
        <span className={!color?"text-gold":""}><small className="t80">{Trans("unit")}</small>{doCurrency(amount,0)}<span className="t60">.{getriz}</span></span>
      </>
    );
  
};

export default ShowAmount;
