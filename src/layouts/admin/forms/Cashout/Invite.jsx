import Invite from "../../../../pages/dashboard/Invite";
import InviteLink from "../../../../pages/dashboard/InviteLink";
import BonusArea from "../../../../layouts/admin/reffer/index.jsx";
import Trans from "../../../../utils/getword";

import LazyLoad from "react-lazyload";
const depositArea = (prop) => {
  const loginToken = prop.loginToken;
  return (
    <>
      <div style={{ padding: "0 20px" }}>
        
        <InviteLink {...prop} />
        {/* <Invite {...prop} /> */}
      </div>

      {loginToken?.accessToken && !loginToken?.logout && (
        <span className="myaccount popupmenu">
          <div className="lazyarea">
            <LazyLoad height={300}>
              <ul className="mm-listview">
                <li className="menutitle mm-listitem"></li>
                <li className="menutitle mm-listitem">
                  <span className="mm-listitem__text">{Trans("myuser")}</span>
                </li>
              </ul>
              <div style={{ padding: "0 15px" }}>
                <BonusArea {...prop} />
              </div>
            </LazyLoad>
          </div>
        </span>
      )}
    </>
  );
};

export default depositArea;
