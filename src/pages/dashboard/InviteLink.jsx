import React, { useState } from "react";
import { Label, Input, Button, Icon, Divider, Segment,Image ,Header,Dimmer,Loader} from "semantic-ui-react";
import AnimIcon from "../../utils/inviteIcon";
import { CopyToClipboard } from "react-copy-to-clipboard";
import MyMsg from "../../utils/MsgDesc";

import Trans from "../../utils/getword";

const depositArea = (prop) => {
  const [copy, setCopy] = useState(false);
  const siteInfo = prop.siteInfo;
  const loginToken = prop.loginToken;
 
  var link = siteInfo.referUrl + "ref/" + loginToken.username;
  const copyDo = () => {
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 3000);
  };
  if(!siteInfo?.referUrl)  {
return (
        <Dimmer active>
            <Loader className="farsi-inline" size="large">{Trans("loading")}</Loader>
        </Dimmer>
)
    
}
  return (
    <span className="myaccount popupmenu">
      
      <div style={{ height: 120, position: "relative" }}>
        <div
          className="fadeout"
          style={{ position: "absolute", zIndex: 0, top: -15 }}
        >
          <AnimIcon
            icon="uqpazftn"
            width="300px"
            height="200px"
            trigger="loop"
          />
        </div>
      </div>
      <MyMsg
        color="red"
        size="mini"
        text={
          <>
            <strong className="farsi">{Trans("invite_linktitle")}</strong>
            <p>{Trans("invite_linktext")}</p>
          </>
        }
      />
      <Segment padded><Image src={"https://api.dub.co/qr?url="+link}    fluid/><Header as='h2' textAlign='center'>Scan Me</Header></Segment>
      <Input
        size="mini"
        readOnly
        fluid
        
        labelPosition="left"
        defaultValue={link}
      />

      <CopyToClipboard text={link} onCopy={() => copyDo()}>
        <Button
          icon
          labelPosition="left"
          size="small"
          color={copy ? "green" : "red"}
          fluid
          style={{ margin: "10px 0" }}
          className="farsi"
        >
          {!copy ? (
            <>
              <Icon name="copy outline" />
           Copy Link
            </>
          ) : (
            <>
              <Icon name="check" /> Copied.
            </>
          )}
        </Button>
      </CopyToClipboard>
      
      
      
    </span>
  );
};
export default depositArea;
