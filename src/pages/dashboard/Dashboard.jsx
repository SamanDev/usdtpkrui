import React, { Suspense, lazy, useEffect } from "react";

import MenuLoader from "../../utils/menuLoader";
//import UserDash from "./UserDash";
import PushNot from "../../pushNot.component";
import Index from "./index";

//const Index = lazy(() => import("./index"));
const UserDash = lazy(() => import("./UserDash"));
import $ from "jquery";
const Dashboard = (prop) => {
  
  localStorage.removeItem("tableName");

  const loginToken = prop.loginToken;
  const siteInfo = prop.siteInfo;

  siteInfo?.galaxyPassSet?.sort((a, b) => (a.id > b.id ? 1 : -1));
  siteInfo?.vipTables?.sort((a, b) => (a.id > b.id ? 1 : -1));
  siteInfo?.dailyLeagueSet?.sort((a, b) => (a.id > b.id ? 1 : -1));

  const handleFullscreen = (e) => {
    $(".framegame,body").removeClass("fullscreen");

    prop.reportWindowSize();
  };

  useEffect(() => {
    handleFullscreen();
  }, []);
  return (
    <>
      <div id="dashboard" className="">
        {loginToken?.accessToken && !loginToken?.logout ? (
          <>
            <Suspense fallback={<MenuLoader />}>
              <PushNot {...prop} />
              
            <UserDash
                loginToken={prop.loginToken}
                siteInfo={prop.siteInfo}
                openPanel={prop.openPanel}
              />
         
              
            </Suspense>
          </>
        ) : (
          <>
            <div>
              <Suspense fallback={<MenuLoader />}>
                <Index {...prop} />
              </Suspense>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
