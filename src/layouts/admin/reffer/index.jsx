import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import Bonus from "./bonus";

import MenuLoader from "../../../utils/menuLoader";
import { getRefferService } from "../../../services/report";

import { List } from "semantic-ui-react";
import Trans from "../../../utils/getword";

import NoData from "../../../utils/noData";
const BonusArea = (prop) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const noDatamsg = Trans("norecord");
  const handleGetReports = async () => {
    setLoading(true);
    try {
      const res = await getRefferService();
      if (res.status === 200) {
        var _res = res.data
          .filter((item) => item.dailyPoint >= 0)
          .sort((a, b) => (a.dailyPoint < b.dailyPoint ? 1 : a.lastLogin < b.lastLogin?1:-1));
        setData(_res);
      }
      setLoading(false);
    } catch (error) {
      //console.log(error.message);
    }
  };

  useEffect(() => {
    handleGetReports();
  }, []);

  if (loading) {
    return <MenuLoader />;
  } else {
    if(data.length==0){
      return (
        <>
          <List.Item>
            <List.Content>
            <NoData msg={noDatamsg} />
            </List.Content>
          </List.Item>
        </>
      )
    }
    return (
      <div style={{ margin: "5px 0 5px 0" }} className="bonuslist fadeoutend">
        {data.length > 0 && (
          <>
            <Grid
              verticalAlign="middle"
              divided="vertically"
              inverted
              padded="vertically"
            >
              {data.map(function (user, i) {
                if (i <= 100) return <Bonus key={i} user={user} {...prop} />;
              })}
            </Grid>
          </>
        )}
      </div>
    );
  }
};

export default BonusArea;
