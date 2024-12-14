import React from "react";

import Content from "../../pages/Content";

import Navbar from "./navbar/Index";
import PWAPrompt from "react-ios-pwa-prompt";

import { Image } from "semantic-ui-react";
import Trans from "../../utils/getword";

const Index = (prop) => {
  return (
    <>
      {prop.loginToken?.accessToken && !prop.loginToken?.logout && (
        <PWAPrompt
          timesToShow={300}
          delay={1000}
          copyTitle={
            <>
              <Image
                src={"/maskable_icon_x192.png"}
                size="mini"
                verticalAlign="middle"
                floated="left"
                alt={Trans("installapplong")}
                title={Trans("installapplong")}
                style={{ marginBottom: 0 }}
              />
              <span className="farsi">{Trans("installapp")}</span>
            </>
          }
          copyBody={
            <>
              <span>
                {Trans("addtohomeHead")}
               
              </span>
            </>
          }
          copyClosePrompt="Close"
          permanentlyHideOnDismiss={false}
          copyShareButtonLabel={
            <span className="animated inline headShake infinite slower delay-2s">{Trans("addtohome_1")}</span>
          }
          copyAddHomeButtonLabel={
            <span className="animated inline headShake infinite slower delay-4s">{Trans("addtohome_2")}</span>
          }
        />
      )}

      <div id="mypage">
        <Content {...prop} />
        <Navbar {...prop} />
      </div>
    </>
  );
};

export default Index;
