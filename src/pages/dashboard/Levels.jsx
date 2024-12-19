import React from "react";
import { List } from "semantic-ui-react";
import { doCurrency, levelClassInside } from "../../const";
import LevelIcon from "../../utils/svg";

import LevelBar from "../../utils/LevelBar";
import LastRewardList from "./LastRewardList";
import LazyLoad from "react-lazyload";
import Trans from "../../utils/getword";

const LevelList = (prop) => {
  var totalReward = 0;

  const siteInfo = prop.siteInfo;
  const loginToken = prop.loginToken;
  siteInfo?.levelUps?.sort((a, b) => (a.id > b.id ? 1 : -1));
 /*  {siteInfo.levelUps.map((x, i) => {
    x.reward=x.reward/10;
    x.point=x.point/10;
  })}
  console.log(siteInfo.levelUps); */
  
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
          
          {siteInfo.levelUps.map((x, i) => {
          

            totalReward += x.reward;

            return (
              <LazyLoad key={i} height={98} className="item">
                <List.Item
                  id={"lvl" + (i + 1)}
                  className={
                    loginToken?.level == x.level
                      ? "animated fadeIn"
                      : "animated fadeIn"
                  }
                >
                  <List.Content floated="right" className="rtl float-end ">
                    
                  
                      <small className="farsi">{Trans("reward")} </small> <span className="text-gold"><small className="text-gold">{Trans("unit")}</small>{doCurrency(x.reward,0)} </span>
              
                    <div className="mysmall">
                      
                      <small className="farsi">{Trans("commitions")} & {Trans("rakeback")}</small>
                      <span className="text-gold">{x.commission}% </span>
                      <div>
                      <small className="farsi">{Trans("totalreward")}</small> {Trans("unit")}{doCurrency(totalReward,0)}
                       
                      </div>
                    </div>
                  </List.Content>
                  <LevelIcon
                    level={x.level}
                    mode="levels"
                    text={"Level " + x.level}
                    classinside={levelClassInside(i)}
                    number={x.level}
                    width="38px"
                  />

                  {loginToken?.accessToken && (
                    <div className="levelbar">
                      {loginToken.level == i + 1 ? (
                        <>
                          <LevelBar progress {...prop} />
                        </>
                      ) : (
                        <>
                          {loginToken.level > i + 1 ? (
                            <>
                              <LevelBar val="100" progress {...prop} />
                            </>
                          ) : (
                            <>
                              <LevelBar val="0" {...prop} />
                            </>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </List.Item>
              </LazyLoad>
            );
          })}
        </List>
        <LazyLoad height={300}>
          <LastRewardList mode="levels" {...prop} />
        </LazyLoad>
      </span>
    </span>
  );
};

export default LevelList;
