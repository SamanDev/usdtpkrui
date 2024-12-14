import React from "react";
import { Icon, Button, Divider } from "semantic-ui-react";
import Trans from "./getword";

const Balance = (prop) => {
  const siteInfo = prop?.siteInfo;

  return (
    <div className="farsi text-center mymessage ui small">
      <Divider inverted />
      <Button
            color="blue"
            className="farsi"
            size="mini"
            as="a"
            href={"https://t.me/" + siteInfo?.telegramSupport}
            target="_blank"
            style={{ marginBottom: 10 }}
          >
            <Icon
              name="telegram"
             
          
            />{" "}
            {Trans("telegramsupport")}
          </Button>
          <br />
          <Button
            color="blue"
            className="farsi"
            size="mini"
            as="a"
            href={"https://t.me/" + siteInfo?.telegramChanel}
            target="_blank"
          >
            <Icon
              name="telegram"
         
              
            />{" "}
           {Trans("telegramchannel")} 
          </Button>
          <Button
            color="purple"
            className="farsi"
            size="mini"
            as="a"
            href={"https://instagram.com/" + siteInfo?.instagram}
            target="_blank"
          >
            <Icon
              name="instagram"
            
              
            />{" "}{Trans("instagram")}
            
          </Button>
    </div>
  );
};

export default Balance;
