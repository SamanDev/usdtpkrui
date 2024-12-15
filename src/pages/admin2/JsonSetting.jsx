import React, { useState, useEffect } from "react";

import { adminPutServiceList, adminPostService } from "../../services/admin";
import { Alert } from "../../utils/alerts";
import { MyConfirm } from "../../utils/myAlert";
import { isJson } from "../../const";
import { JsonEditor } from "react-jsondata-editor";
import { publicGetRules } from "../../services/admin";
import {
  Input,
  Segment,
  Button,
  Dimmer,
  Loader,
  Icon,
  Modal,
  Grid,
  Label,
} from "semantic-ui-react";
const getGateways = JSON.parse(localStorage.getItem("getGateways"));
function sordData(siteInfo) {
  var _siteInfo = siteInfo;
  _siteInfo.galaxyPassSet = _siteInfo.galaxyPassSet.sort((a, b) =>
    a.id > b.id ? 1 : -1
  );
  _siteInfo.levelUps = _siteInfo.levelUps.sort((a, b) =>
    a.id > b.id ? 1 : -1
  );
  _siteInfo.vipTables = _siteInfo.vipTables.sort((a, b) =>
    a.id > b.id ? 1 : -1
  );
  _siteInfo.dailyLeagueSet = _siteInfo.dailyLeagueSet.sort((a, b) =>
    a.id > b.id ? 1 : -1
  );
  _siteInfo.depositBonus = _siteInfo.depositBonus;
  return _siteInfo;
}
const useSiteInfo = (info) => {
  const [siteInfo, setSiteInfo] = useState(info);

  const handleCheckLogin = async () => {
    try {
      const res = await publicGetRules();
      if (res.status === 200) {
        if (isJson(res.data)) {
          var _data = res.data;
          localStorage.setItem("siteInfoAdmin", JSON.stringify(_data));
          setSiteInfo(_data);
        }
      }
    } catch (error) {}
  };
  useEffect(() => {
    handleCheckLogin();
  }, []);

  return [siteInfo];
};
function Admin(prop) {
  String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, "g"), replacement);
  };

  String.prototype.toPersianCharacter = function () {
    var string = this;

    var obj = {
      "١": "۱",
      "٢": "۲",
      "٣": "۳",
      "٤": "۴",
      "٥": "۵",
      "٦": "۶",
      "٧": "۷",
      "٨": "۸",
      "٩": "۹",
      "٠": "۰",
      "۱": "1",
      "۲": "2",
      "۳": "3",
      "۴": "4",
      "۵": "5",
      "۶": "6",
      "۷": "7",
      "۸": "8",
      "۹": "9",
      "۰": "0",
    };

    Object.keys(obj).forEach(function (key) {
      string = string.replaceAll(key, obj[key]);
    });
    return string;
  };

  const [siteInfo] = useSiteInfo();
  //console.log(siteInfo);
  if (!siteInfo?.galaxyPassSet) {
    return null;
  }
  var siteInfoNew = siteInfo;
   siteInfoNew.levelUps = [
    {
        "id": 1,
        "level": 1,
        "commission": 10,
        "point": 200,
        "reward": 10
    },
    {
        "id": 2,
        "level": 2,
        "commission": 10,
        "point": 400,
        "reward": 20
    },
    {
        "id": 3,
        "level": 3,
        "commission": 10,
        "point": 600,
        "reward": 30
    },
    {
        "id": 4,
        "level": 4,
        "commission": 10,
        "point": 800,
        "reward": 40
    },
    {
        "id": 5,
        "level": 5,
        "commission": 11,
        "point": 1000,
        "reward": 50
    },
    {
        "id": 6,
        "level": 6,
        "commission": 11,
        "point": 1200,
        "reward": 60
    },
    {
        "id": 7,
        "level": 7,
        "commission": 11,
        "point": 1400,
        "reward": 70
    },
    {
        "id": 8,
        "level": 8,
        "commission": 11,
        "point": 1600,
        "reward": 80
    },
    {
        "id": 9,
        "level": 9,
        "commission": 11,
        "point": 1800,
        "reward": 90
    },
    {
        "id": 10,
        "level": 10,
        "commission": 12,
        "point": 2000,
        "reward": 100
    },
    {
        "id": 11,
        "level": 11,
        "commission": 12,
        "point": 2400,
        "reward": 120
    },
    {
        "id": 12,
        "level": 12,
        "commission": 12,
        "point": 3000,
        "reward": 150
    },
    {
        "id": 13,
        "level": 13,
        "commission": 12,
        "point": 3600,
        "reward": 180
    },
    {
        "id": 14,
        "level": 14,
        "commission": 12,
        "point": 4200,
        "reward": 210
    },
    {
        "id": 15,
        "level": 15,
        "commission": 13,
        "point": 4800,
        "reward": 240
    },
    {
        "id": 16,
        "level": 16,
        "commission": 13,
        "point": 5400,
        "reward": 270
    },
    {
        "id": 17,
        "level": 17,
        "commission": 13,
        "point": 6000,
        "reward": 300
    },
    {
        "id": 18,
        "level": 18,
        "commission": 13,
        "point": 6600,
        "reward": 330
    },
    {
        "id": 19,
        "level": 19,
        "commission": 13,
        "point": 7200,
        "reward": 360
    },
    {
        "id": 20,
        "level": 20,
        "commission": 14,
        "point": 7800,
        "reward": 390
    },
    {
        "id": 21,
        "level": 21,
        "commission": 14,
        "point": 8400,
        "reward": 420
    },
    {
        "id": 22,
        "level": 22,
        "commission": 14,
        "point": 9800,
        "reward": 490
    },
    {
        "id": 23,
        "level": 23,
        "commission": 14,
        "point": 11200,
        "reward": 560
    },
    {
        "id": 24,
        "level": 24,
        "commission": 14,
        "point": 12600,
        "reward": 630
    },
    {
        "id": 25,
        "level": 25,
        "commission": 15,
        "point": 14000,
        "reward": 700
    },
    {
        "id": 26,
        "level": 26,
        "commission": 15,
        "point": 15400,
        "reward": 770
    },
    {
        "id": 27,
        "level": 27,
        "commission": 15,
        "point": 16800,
        "reward": 840
    },
    {
        "id": 28,
        "level": 28,
        "commission": 15,
        "point": 18200,
        "reward": 910
    },
    {
        "id": 29,
        "level": 29,
        "commission": 15,
        "point": 19600,
        "reward": 980
    },
    {
        "id": 30,
        "level": 30,
        "commission": 16,
        "point": 21000,
        "reward": 1050
    },
    {
        "id": 31,
        "level": 31,
        "commission": 16,
        "point": 24000,
        "reward": 1200
    },
    {
        "id": 32,
        "level": 32,
        "commission": 16,
        "point": 27000,
        "reward": 1350
    },
    {
        "id": 33,
        "level": 33,
        "commission": 16,
        "point": 30000,
        "reward": 1500
    },
    {
        "id": 34,
        "level": 34,
        "commission": 16,
        "point": 33000,
        "reward": 1650
    },
    {
        "id": 35,
        "level": 35,
        "commission": 17,
        "point": 36000,
        "reward": 1800
    },
    {
        "id": 36,
        "level": 36,
        "commission": 17,
        "point": 39000,
        "reward": 1950
    },
    {
        "id": 37,
        "level": 37,
        "commission": 17,
        "point": 42000,
        "reward": 2100
    },
    {
        "id": 38,
        "level": 38,
        "commission": 18,
        "point": 45000,
        "reward": 2250
    },
    {
        "id": 39,
        "level": 39,
        "commission": 18,
        "point": 48000,
        "reward": 2400
    },
    {
        "id": 40,
        "level": 40,
        "commission": 18,
        "point": 51000,
        "reward": 2550
    },
    {
        "id": 41,
        "level": 41,
        "commission": 19,
        "point": 54000,
        "reward": 2700
    },
    {
        "id": 42,
        "level": 42,
        "commission": 19,
        "point": 57000,
        "reward": 2850
    },
    {
        "id": 43,
        "level": 43,
        "commission": 19,
        "point": 60000,
        "reward": 3000
    },
    {
        "id": 44,
        "level": 44,
        "commission": 20,
        "point": 63000,
        "reward": 3150
    },
    {
        "id": 45,
        "level": 45,
        "commission": 20,
        "point": 66000,
        "reward": 3300
    },
    {
        "id": 46,
        "level": 46,
        "commission": 20,
        "point": 69000,
        "reward": 3450
    },
    {
        "id": 47,
        "level": 47,
        "commission": 21,
        "point": 72000,
        "reward": 3600
    },
    {
        "id": 48,
        "level": 48,
        "commission": 21,
        "point": 75000,
        "reward": 3750
    },
    {
        "id": 49,
        "level": 49,
        "commission": 21,
        "point": 78000,
        "reward": 3900
    },
    {
        "id": 50,
        "level": 50,
        "commission": 22,
        "point": 81000,
        "reward": 4050
    },
    {
        "id": 51,
        "level": 51,
        "commission": 22,
        "point": 84000,
        "reward": 4200
    },
    {
        "id": 52,
        "level": 52,
        "commission": 23,
        "point": 87000,
        "reward": 4350
    },
    {
        "id": 53,
        "level": 53,
        "commission": 23,
        "point": 90000,
        "reward": 4500
    },
    {
        "id": 54,
        "level": 54,
        "commission": 24,
        "point": 93000,
        "reward": 4650
    },
    {
        "id": 55,
        "level": 55,
        "commission": 24,
        "point": 96000,
        "reward": 4800
    },
    {
        "id": 56,
        "level": 56,
        "commission": 25,
        "point": 99000,
        "reward": 4950
    },
    {
        "id": 57,
        "level": 57,
        "commission": 25,
        "point": 102000,
        "reward": 5100
    },
    {
        "id": 58,
        "level": 58,
        "commission": 26,
        "point": 105000,
        "reward": 5250
    },
    {
        "id": 59,
        "level": 59,
        "commission": 26,
        "point": 108000,
        "reward": 5400
    },
    {
        "id": 60,
        "level": 60,
        "commission": 27,
        "point": 111000,
        "reward": 5550
    },
    {
        "id": 61,
        "level": 61,
        "commission": 27,
        "point": 114000,
        "reward": 5700
    },
    {
        "id": 62,
        "level": 62,
        "commission": 29,
        "point": 120000,
        "reward": 6000
    },
    {
        "id": 63,
        "level": 63,
        "commission": 29,
        "point": 126000,
        "reward": 6300
    },
    {
        "id": 64,
        "level": 64,
        "commission": 30,
        "point": 132000,
        "reward": 6600
    },
    {
        "id": 65,
        "level": 65,
        "commission": 30,
        "point": 138000,
        "reward": 6900
    },
    {
        "id": 66,
        "level": 66,
        "commission": 31,
        "point": 144000,
        "reward": 7200
    },
    {
        "id": 67,
        "level": 67,
        "commission": 31,
        "point": 150000,
        "reward": 7500
    },
    {
        "id": 68,
        "level": 68,
        "commission": 32,
        "point": 156000,
        "reward": 7800
    },
    {
        "id": 69,
        "level": 69,
        "commission": 32,
        "point": 162000,
        "reward": 8100
    },
    {
        "id": 70,
        "level": 70,
        "commission": 33,
        "point": 168000,
        "reward": 8400
    },
    {
        "id": 71,
        "level": 71,
        "commission": 33,
        "point": 176000,
        "reward": 8800
    },
    {
        "id": 72,
        "level": 72,
        "commission": 34,
        "point": 184000,
        "reward": 9200
    },
    {
        "id": 73,
        "level": 73,
        "commission": 34,
        "point": 192000,
        "reward": 9600
    },
    {
        "id": 74,
        "level": 74,
        "commission": 34,
        "point": 200000,
        "reward": 10000
    },
    {
        "id": 75,
        "level": 75,
        "commission": 35,
        "point": 208000,
        "reward": 10400
    },
    {
        "id": 76,
        "level": 76,
        "commission": 35,
        "point": 216000,
        "reward": 10800
    },
    {
        "id": 77,
        "level": 77,
        "commission": 35,
        "point": 224000,
        "reward": 11200
    },
    {
        "id": 78,
        "level": 78,
        "commission": 35,
        "point": 232000,
        "reward": 11600
    },
    {
        "id": 79,
        "level": 79,
        "commission": 35,
        "point": 240000,
        "reward": 12000
    },
    {
        "id": 80,
        "level": 80,
        "commission": 35,
        "point": 248000,
        "reward": 12400
    },
    {
        "id": 81,
        "level": 81,
        "commission": 35,
        "point": 256000,
        "reward": 12800
    },
    {
        "id": 82,
        "level": 82,
        "commission": 35,
        "point": 264000,
        "reward": 13200
    },
    {
        "id": 83,
        "level": 83,
        "commission": 35,
        "point": 272000,
        "reward": 13600
    },
    {
        "id": 84,
        "level": 84,
        "commission": 35,
        "point": 280000,
        "reward": 14000
    },
    {
        "id": 85,
        "level": 85,
        "commission": 35,
        "point": 288000,
        "reward": 14400
    },
    {
        "id": 86,
        "level": 86,
        "commission": 35,
        "point": 296000,
        "reward": 14800
    },
    {
        "id": 87,
        "level": 87,
        "commission": 35,
        "point": 304000,
        "reward": 15200
    },
    {
        "id": 88,
        "level": 88,
        "commission": 35,
        "point": 312000,
        "reward": 15600
    },
    {
        "id": 89,
        "level": 89,
        "commission": 35,
        "point": 320000,
        "reward": 16000
    },
    {
        "id": 90,
        "level": 90,
        "commission": 35,
        "point": 328000,
        "reward": 16400
    }
]

  let input = '{"Settings":' + JSON.stringify(sordData(siteInfoNew)) + "}";

  const saveObj = async (info) => {
    var _data = JSON.parse(info);
    var data = _data.Settings;

    try {
      const res = await adminPutServiceList(data, "editGalaxyRewardRules");
      if (res.status == 200) {
        Alert("Done", "", "success");
      } else {
        Alert("متاسفم...!", res.data.message, "error");
      }
    } catch (error) {
      Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
    }
  };
  const confirmshutdown = async (data) => {
    MyConfirm("تایید تغییر  ", "", shutdown, data);
  };
  const shutdown = async (status) => {
    var data = { shutdown: !status };

    //console.log(data)
    //return false
    try {
      const res = await adminPostService(data, "shutdown");
      if (res.status == 200) {
        Alert("Done", "", "success");
      } else {
        Alert("متاسفم...!", res.data.message, "error");
      }
    } catch (error) {
      Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
    }
  };

  return (
    <>
      <div
        className="reportTable"
        style={{ height: "calc(100vh - 150px)", overflow: "auto" }}
      >
        <Button
          color={siteInfo.shutdown ? "green" : "red"}
          onClick={() => confirmshutdown(siteInfo.shutdown)}
        >
          {siteInfo.shutdown ? "Start Server" : "ShutDown Server"}
        </Button>
        <JsonEditor
          jsonObject={input}
          onChange={(output) => {
            saveObj(output);
          }}
        />
      </div>
    </>
  );
}

export default Admin;
