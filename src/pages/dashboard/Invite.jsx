import React from "react";
import Register from "../../layouts/admin/auth/Invite";
import MyMsg from "../../utils/MsgDesc";

import AnimIcon from "../../utils/inviteIcon";
import Trans from "../../utils/getword";
import { Divider} from "semantic-ui-react";

const AccordionExampleStandard = (prop) => {
  return (
    <span className="myaccount popupmenu">
      <Divider inverted section horizontal className="farsi">
      {Trans("or")}
      </Divider>
      <div style={{ height: 120, position: "relative" }}>
        <div
          className="fadeout"
          style={{ position: "absolute", zIndex: 0, top: -25 }}
        >
          <AnimIcon
            icon="zpxybbhl"
            width="300px"
            height="200px"
            trigger="loop"
          />
        </div>
      </div>
      <MyMsg
        color="yellow"
        size="mini"
        text={
          <>
          <strong className="farsi">{Trans("invite_formtitle")}</strong>
          <p>{Trans("invite_formtext")}</p>
           
           
          </>
        }
      />

      <Register labelcolor="orange" size="mini" {...prop} />
    </span>
  );
};

export default AccordionExampleStandard;
