import React, { useState } from "react";
import { Header, Divider, Button, Segment } from "semantic-ui-react";
import { checkBlock } from "../../../services/httpService";
import { getUserService } from "../../../services/auth";
import Trans from "../../../utils/getword";

const depositArea = (prop) => {
  const [depMode, setDepMode] = useState(false);
  const loginToken = prop.loginToken;

  return (
    <Segment
      inverted
      padded="very"
      style={{
        paddingBottom: 50,
        boxShadow: "0 40px 50px rgba(81,88,95,.6549019607843137)",
      }}
    >
      <Header as="h2" inverted className="farsi">{Trans("dctitle")}</Header>
      <Divider hidden />

      <p className="farsi">{Trans("dcdesc")}</p>
      <Divider inverted />
      <Button
        content={Trans("connectagain")}
        fluid
        type="button"
        size="huge"
        style={{ margin: "10px 0" }}
        disabled={depMode}
        loading={depMode}
        //id="reconn"
        onClick={() => {
          getUserService()
          setDepMode(true);
          //window.location.reload();
        }}
        className="farsi"
        color="red"
      />
    </Segment>
  );
};

export default depositArea;
