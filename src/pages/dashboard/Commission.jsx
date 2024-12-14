import React from "react";
import { Icon, List, Button } from "semantic-ui-react";
import $ from "jquery";
import GalaxyIcon from "../../utils/svganim";

import GiftsDesc from "../../utils/GiftsDesc";

import LastRewardList from "./LastRewardList";
import Trans from "../../utils/getword";

import LazyLoad from "react-lazyload";
const LevelList = (prop) => {
  const loginToken = prop.loginToken;
  const siteInfo = prop.siteInfo;
  function getBonus(gateway) {
    try {
      var data_filter = loginToken.cashierGateways.filter(
        (element) => element.name == gateway
      );
      var bonus = data_filter[0].bonus;
    } catch (error) {
      var loginToken2 = [
        {
          id: 2,
          total: 0,
          bonus: 5,
          name: "USDT",
          mode: "CoinPayments",
          active: true,
        },
        {
          id: 3,
          total: 0,
          bonus: 10,
          name: "PerfectMoney",
          mode: "PerfectMoney",
          active: true,
        },
        {
          id: 1,
          total: 0,
          bonus: 0,
          name: "Digipay",
          mode: "IranShetab",
          active: true,
        },
        {
          id: 6,
          total: 0,
          bonus: 0,
          name: "Transfer",
          mode: "Transfer",
          active: true,
        },
        {
          id: 8,
          total: 0,
          bonus: 2,
          name: "VisaGiftCode",
          mode: "VisaGiftCode",
          active: true,
        },
        {
          id: 10,
          total: 0,
          bonus: 0,
          name: "Haft80",
          mode: "IranShetab",
          active: true,
        },
        {
          id: 4,
          total: 0,
          bonus: 0,
          name: "CartToCart",
          mode: "CartToCart",
          active: true,
        },
        {
          id: 12,
          total: 0,
          bonus: 0,
          name: "Commission",
          mode: "Commission",
          active: true,
        },
        {
          id: 5,
          total: 0,
          bonus: 0,
          name: "Rakeback",
          mode: "Rakeback",
          active: true,
        },
        {
          id: 9,
          total: 0,
          bonus: 0,
          name: "BankTransfer",
          mode: "BankTransfer",
          active: true,
        },
        {
          id: 11,
          total: 0,
          bonus: 0,
          name: "Hamrahcart",
          mode: "IranShetab",
          active: true,
        },
        {
          id: 7,
          total: 0,
          bonus: 5,
          name: "Bitcoin",
          mode: "CoinPayments",
          active: true,
        },
      ];
      var data_filter = loginToken2.filter(
        (element) => element.name == gateway
      );

      if (data_filter.length > 0) {
        var bonus = data_filter[0].bonus;
      } else {
        var bonus = 0;
      }
    }

    return bonus;
  }
  return (
    <span className="myaccount popupmenu">
      <span className="lazyarea">
        <List
          divided
          inverted
          verticalAlign="middle"
          className="myaccount"
          style={{ padding: "0 20px" }}
        >
          <List.Item>
            <List.Content className="rtl text-center">
              <div className=" animated ">
                {prop.mode == "commission" ? (
                  <>
                    <GalaxyIcon
                      mode="commission"
                      level=""
                      text={Trans("friendcommitions")}
                      classinside="iconinside0"
                      number="1"
                      width="60px"
                      amin="inline animated bounceIn fast"
                      iconamin="swing"
                    />

                    <Button
                      onClick={() => $("#openinvite").trigger("click")}
                      color="red"
                      icon
                      labelPosition="left"
                      fluid
                      className="farsi-inline"
                      style={{ margin: "10px 0" }}
                    >
                      <Icon name="user" />{Trans("invitefriends")}
                    </Button>
                    <GiftsDesc
                      desc={
                        <>
{Trans("comissiondesc")}{" "}
                          <span
                            className="farsi text-gold"
                            style={{ cursor: "pointer" }}
                            onClick={() => $("#openlevellist").trigger("click")}
                          >
                            {Trans("moreinfo")}
                          </span>
                        </>
                      }
                     
                      title="10% to 35%"
                      subtitle={Trans("commitions")}
                    />
                  </>
                ) : (
                  <>
                    <GalaxyIcon
                      mode="rakeback"
                      level=""
                      text={Trans("pokerrakeback")}
                      classinside="iconinside0"
                      number="1"
                      width="60px"
                      amin="inline animated heartBeat fast"
                      iconamin="swing"
                    />
                    <GiftsDesc
                      desc={
                        <>
{Trans("rakebackdesc")}{" "}
                          <span
                            className="farsi text-gold"
                            style={{ cursor: "pointer" }}
                            onClick={() => $("#openlevellist").trigger("click")}
                          >
                            {Trans("moreinfo")}
                          </span>
                        </>
                      }
                     
                      title="10% to 35%"
                      subtitle={Trans("pokerrakeback")}
                    />
                  </>
                )}
              </div>
            </List.Content>
          </List.Item>
        </List>
        <LazyLoad height={300}>
          <LastRewardList mode={prop.mode} {...prop} />
        </LazyLoad>
      </span>
    </span>
  );
};

export default LevelList;
