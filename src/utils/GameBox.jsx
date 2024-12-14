import React from "react";
import { Segment, Label } from "semantic-ui-react";
import AnimIcon from "./inviteIcon";
import Trans from "./getword";

const SegmentExampleInverted = (prop) => {
    var icon = "sroxggda";
    var classn = "text-secondary-emphasis2 opacity-75 farsi";
    var bbackground = prop.bg ? "rgba(0,0,0,.55)" : "rgba(0,0,0,.85)";
    var comiingsoon = prop.bg ? prop.bg : "none";
    var name = prop.game;
    var namegame = prop.name ? prop.name : prop.game;
    if (prop.game == "more") {
        name = "بازی ها";
        //name = "...";
        icon = "afzktxmo";
        bbackground = "rgba(0,0,0,.2)";
        var classn = "text-secondary-emphasis2 opacity-50 farsi";
    }
    if (prop.game == "poker") {
       
        icon = "sroxggda";
    }
    if (prop.game == "wheel") {
       
        icon = "aadumupd";
    }
    if (prop.game == "bet") {
      
        icon = "xlmenhhh";
    }
    if (prop.game == "crash") {
        name = "BoOoOoM";
        icon = "scsthizh";
    }
    if (prop.game == "backgammon") {
        
        icon = "dice";
    }
    if (prop.game.indexOf("roulette") > -1) {
        name = prop.game.replace("roulette", "roulette ");
        icon = "iexaoqby";
    }
    if (prop.game.indexOf("wheelof") > -1) {
        name = prop.game;
        icon = "aadumupd";
    }
    if (prop.game.indexOf("highl") > -1) {
        //name = prop.game;
        icon = "wave";
    }
    if (prop.game.indexOf("slot") > -1) {
        name = prop.game.replace("slot", "Slot ");
        icon = "eagxishj";
    }
    if (prop.game.indexOf("blackjack") > -1) {
        name = prop.game.replace("blackjack", "blackjack");
        icon = "qdxgyudy";
    }
    return (
        <Segment
            inverted
            raised
            className="fadeou5t"
            style={{
                background: bbackground,
                filter: comiingsoon,
                cursor: "pointer",
                overflow: "hidden",
                height: prop.height ? prop.height : 120,
                borderRadius: 10,
            }}
        >
            <div
                className="fadeout"
                style={{
                    height: prop.height ? prop.height : 100,
                    position: "relative",
                    width: "100%",
                }}
            >
                <div
                    style={{
                        position: "absolute",

                        top: -10,
                        zIndex: 4,
                        right: 0
                    }}
                >
                    <AnimIcon icon={icon} width={prop.height ? prop.height : 80} height={prop.height ? prop.height : 100} trigger={prop.trigger} delay="5500" stroke={prop.stroke ? prop.stroke : 15} colors={prop.bg ? "primary:#e4e4e4,secondary:#e8b730" : ""} />
                </div>
                {prop.bg ? (
                    <Label size="mini" color="red" className="farsi">{Trans("commingsoon")}</Label>
                ) : (
                    ""
                )}
                <div
                    className={classn}
                    style={{
                        fontSize: prop.height ? parseInt(prop.height) / 6 + "px" : 20,
                        padding: prop.height ? parseInt(prop.height) / 10 + "px" : 20,
                    }}
                >
                    {prop.name ? namegame : name}
                </div>
            </div>
        </Segment>
    );
};

export default SegmentExampleInverted;
