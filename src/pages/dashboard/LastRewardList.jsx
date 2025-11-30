import React, { useEffect, useState } from "react";
import { List } from "semantic-ui-react";
import Reward from "../../utils/Reward";
import MenuLoader from "../../utils/menuLoader";
import { getRewardsService } from "../../services/reward";
import RewardStat from "./rewardStat";
import LazyLoad from "react-lazyload";
import NoData from "../../utils/noData";
import Trans from "../../utils/getword";

const LevelList = (prop) => {
  const noDatamsg = Trans("norecord");
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  const handleGetRewards = async () => {
        setLoading(true);
        try {
            const res = await getRewardsService("", prop.mode, "", prop.mode == "levels" ? 500 : 500, 1);
            if (res.status === 200) {
                const start = new Date();
                start.setDate(1);
                start.setHours(0, 0, 0, 0);

                const end = new Date();
                end.setDate(31);
                end.setHours(23, 59, 59, 999);
                end.getTime();
                start.getTime();

                if (prop.mode == "gpass" || prop.mode == "vip" || prop.mode == "league") {
                    var _data = res.data
                        .filter((item) => {
                            let date = new Date(item.date).getTime();
                            return date >= start && date <= end;
                        })
                        .sort((a, b) => (a.date < b.date ? 1 : -1));
                } else {
                    var _data = res.data.sort((a, b) => (a.date < b.date ? 1 : -1));
                }

                if (_data.length == 0) {
                    start.setMonth(end.getMonth() - 2);
                    end.getTime();
                    start.getTime();

                    _data = res.data
                        .filter((item) => {
                            let date = new Date(item.date).getTime();
                            return date >= start && date <= end;
                        })
                        .sort((a, b) => (a.date < b.date ? 1 : -1));
                }
               
                if (_data.length == 500) {
                    handleGetRewards2(_data,2);
                }else{
                    setData(_data);
                    setLoading(false);
                }
            }
        } catch (error) {
            ////console.log(error.message);
        }
    };
    const handleGetRewards2 = async (data,page) => {
        //setLoading(true);
        try {
            const res = await getRewardsService("", prop.mode, "", prop.mode == "levels" ? 500 : 500, page);
            if (res.status === 200) {
                const start = new Date();
                start.setDate(1);
                start.setHours(0, 0, 0, 0);

                const end = new Date();
                end.setDate(31);
                end.setHours(23, 59, 59, 999);
                end.getTime();
                start.getTime();

                if (prop.mode == "gpass" || prop.mode == "vip" || prop.mode == "league") {
                    var _data = res.data
                        .filter((item) => {
                            let date = new Date(item.date).getTime();
                            return date >= start && date <= end;
                        })
                        .sort((a, b) => (a.date < b.date ? 1 : -1));
                } else {
                    var _data = res.data.sort((a, b) => (a.date < b.date ? 1 : -1));
                }

                if (_data.length == 0) {
                    start.setMonth(end.getMonth() - 2);
                    end.getTime();
                    start.getTime();

                    _data = res.data
                        .filter((item) => {
                            let date = new Date(item.date).getTime();
                            return date >= start && date <= end;
                        })
                        .sort((a, b) => (a.date < b.date ? 1 : -1));
                }
                _data = data.concat(_data);
                
                if (_data.length == page*500 && _data.length < 4000) {
                    handleGetRewards2(_data,(page+1));
                }else{
                    setData(_data);
                setLoading(false);
                }
            }
        } catch (error) {
            ////console.log(error.message);
        }
    };

  useEffect(() => {
    handleGetRewards();
  }, []);
  var totalReward = 0;
  if (loading && data.length == 0) {
    return (
      <>
        <ul className="mm-listview">
          <li className="menutitle mm-listitem"></li>
          <li className="menutitle mm-listitem">
            <span className="mm-listitem__text">{Trans("lastreward")}</span>
          </li>
        </ul>
        <MenuLoader />
      </>
    );
  } else {
    return (
      <>
        <ul className="mm-listview ">
          <li className="menutitle mm-listitem"></li>

          <li className="menutitle mm-listitem">
            <span className="mm-listitem__text">{Trans("lastreward")}</span>
          </li>

          <div className={"animated fadeIn"}>
            <RewardStat lastReward={data} />
          </div>
        </ul>
        <List divided inverted verticalAlign="middle" className="myaccount">
          {data.length == 0 && (
            <>
              <List.Item>
                <List.Content>
                  <NoData msg={noDatamsg} />
                </List.Content>
              </List.Item>
            </>
          )}

          <div style={{ padding: "0 5px 0 20px" }}>
            {data.map((x, i) => {
              var _lvl = 20 - i;
              var _text = x.username;

              return (
                <LazyLoad height={98} throttle={30} overflow key={i}>
                  <div className={"rewardname animated fadeIn"} mode={x.mode}>
                    <Reward item={x} {...prop} color={true} />
                  </div>
                </LazyLoad>
              );
            })}
          </div>
        </List>
      </>
    );
  }
};

export default LevelList;
