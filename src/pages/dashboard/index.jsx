import React from "react";
import { Button, Header, Icon, Segment, Image, Grid } from "semantic-ui-react";
import $ from "jquery";
import AnimIcon from "../../utils/inviteIcon";
import GameInbox from "./GameInbox";
import RewardStat from "./banners";
import SiteStat from "./sitestats";
import Trans from "../../utils/getword";

import TransLang from "../../test";
function SegmentExamplePlaceholderInline(prop) {
    const siteInfo = prop?.siteInfo;
    return (
        <>
            <div className="container-md">
                <div style={{ height: 10, position: "relative" }}>
                    <div
                        style={{
                            position: "absolute",
                            zIndex: 0,
                            top: -130,
                            width: "100%",
                            textAlign: "center",
                            opacity: 0.9,
                           
                        }}
                    >
                        <AnimIcon icon="ilpmnyul" width="350px" height="500px" trigger="hover" stroke="4" colors="primary:#b5b5b5,secondary:#343c42" />
                    </div>
                </div>
                <div className="text-center" style={{ overflow: "hidden" }}>
                    <Header icon>
                        <Icon>
                            <Image
                                src="/assets/images/logo.png"
                                centered
                                alt={Trans("sitename")}
                                style={{
                                    width: "30vw",
                                    maxWidth: "200px",
                                    marginTop: 80,

                                }}
                            />
                        </Icon>
                        <h2 className="text-center opacity-50">
                            <strong
                                className="farsi fw-normal fs-5"
                                style={{
                                    position: "relative",
                                    top: -50,
                                    color: "rgba(255,255,255,1)",
                                    
                                }}
                            >{Trans("slogan")}
                                 
                            </strong>
                        </h2>
                    </Header>
                </div>

                <GameInbox {...prop} />
            </div>
            <RewardStat {...prop} />
           
                <Segment
                    inverted
                    className="fadeoust"
                    style={{
                        background: "rgba(0,0,0,.2)",

                        overflow: "hidden",

                        lineHeight: "30px",
                    }}
                >
                    &copy; 2024
                    <Button.Group floated="right" size="mini" inverted>
                        <Button basic inverted as="a" icon="telegram" aria-label="telegram" href={"https://t.me/" + siteInfo?.telegramChanel} target="_blank" />
                        <Button basic inverted icon="instagram" aria-label="instagram" as="a" href={"https://instagram.com/" + siteInfo?.instagram} target="_blank" />
                    </Button.Group>
                </Segment>
            
        </>
    );
}

export default SegmentExamplePlaceholderInline;
