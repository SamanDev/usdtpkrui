import React, { useState } from "react";
import VisaGiftCode from "./VisaGiftCode";
import CartToCart from "./CartToCartnew";
import CartToCartOnline from "./CartToCartnew";

import BankTransfer from "./BankTransfer";
import PerfectMoney from "./PerfectMoney";
import ShowAmount from "../../../../utils/ShowAmount";

import USDT from "./USDT";

import BTC from "./BTC";

import AddCartMsg from "./addCartMsg";
import ActivetMsg from "./activetMsg";
import { Statistic, Segment } from "semantic-ui-react";

import { doCurrency } from "../../../../const";
import Trans from "../../../../utils/getword";

const depositArea = (prop) => {
  const [depMode, setDepMode] = useState(prop.gateway);
  const loginToken = prop.loginToken;
  return (
    <>
      {!loginToken?.userActivate ? (
        <>
          <ActivetMsg {...prop} />
        </>
      ) : (
        <>
          <Segment inverted className="blnc">
                <Statistic inverted size="tiny">
                  <Statistic.Value>
                    {prop.menu?.usd ? (
                      <>
                        <span className="text-gold">$</span>{" "}
                       
                        {doCurrency((loginToken?.balance2).toFixed(2))}
                      </>
                    ) : (
                      <ShowAmount amount={loginToken?.balance} />
                    )}
                  </Statistic.Value>
                  <Statistic.Label className="farsi">
                  {Trans("yourbalance")}
                  </Statistic.Label>
                </Statistic>
              </Segment>
          {depMode == "Bank Transfer" && (
            <>
              {loginToken?.bankInfos.length > 0 ? (
                <>
                  <BankTransfer {...prop} />
                </>
              ) : (
                <>
                  <AddCartMsg {...prop} />
                </>
              )}
            </>
          )}
          {depMode == "Online Cart to Cart" && (
            <>
              {loginToken?.bankInfos.length > -10 ? (
                <>
                  <CartToCartOnline {...prop} />
                </>
              ) : (
                <>
                  <AddCartMsg {...prop} />
                </>
              )}
            </>
          )}
          {depMode === "Transfer" && (
            <>
              {prop.menu?.usd ? (
                <>
                  <Segment inverted className="blnc" size="mini">
                    <Statistic inverted size="mini">
                      <Statistic.Value>
                        {doCurrency(loginToken?.balance)}
                      </Statistic.Value>
                      <Statistic.Label className="farsi">
                        موجودی شما
                      </Statistic.Label>
                    </Statistic>
                  </Segment>
                  
                </>
              ) : (
                <CartToCart {...prop} />
              )}
            </>
          )}
          {depMode == "Cart to Cart" && (
            <>
              <>
                {prop.menu?.usd ? (
                  <>
                    <Segment inverted className="blnc" size="mini">
                      <Statistic inverted size="mini">
                        <Statistic.Value>
                          {doCurrency(loginToken?.balance)}
                        </Statistic.Value>
                        <Statistic.Label className="farsi">
                          موجودی شما
                        </Statistic.Label>
                      </Statistic>
                    </Segment>
                    <TomantoUsd {...prop} />
                  </>
                ) : (
                  <CartToCart {...prop} />
                )}
              </>
            </>
          )}

          {depMode == "USDT" && (
            <>{prop.menu?.usd ? <USDT {...prop} /> : <USDT {...prop} />}</>
          )}
          {depMode == "BTC" && (
            <>{prop.menu?.usd ? <BTC {...prop} /> : <BTC {...prop} />}</>
          )}
          {depMode == "VisaGiftCode" && <VisaGiftCode {...prop} />}

          {depMode == "PerfectMoney" && (
            <>
              {prop.menu?.usd ? (
                <PerfectMoney {...prop} />
              ) : (
                <PerfectMoney {...prop} />
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default depositArea;
