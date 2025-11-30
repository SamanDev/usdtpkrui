import React from "react";
import { Grid } from "semantic-ui-react";
import LevelIcon from "./svg";
import { doCurrency, levelClassInside, levelDataInfo } from "../const";
import { convertDateToJalali } from "./convertDate";
import CshList from "./commitiondetail";
import $ from "jquery";
import Trans from "../utils/getword";
import ShowAmount from "../utils/ShowAmount";

const Reward = (prop) => {
    const loginToken = prop.loginToken;
    var _unit = Trans("unit")

    var _lvl = prop.item.userdata;
    var _lvl1 = _lvl.split('avatar":"lvl')[1];
    var _lvl2 = _lvl1.split('"')[0];
    _lvl = _lvl2;
    //console.log(_lvl2);

    return (
        <Grid verticalAlign="middle" divided="vertically" inverted padded="vertically">
            <Grid.Row className={loginToken?.username == prop.item.username && !prop.color ? "rewardred" : ""}>
                <Grid.Column width={6}>
                    <div style={{ marginLeft: 10 }}>
                        <LevelIcon level={_lvl} number={_lvl} mode={"levels"} text={prop.item.username} classinside={levelClassInside(_lvl - 1)} width="36px" />
                        <div className={" xwin"}>x{prop.item.x}</div>
                    </div>
                </Grid.Column>
                <Grid.Column width={10} textAlign="right" style={{ paddingRight: 20 }}>
                <ShowAmount amount={prop.item.win} /><br/>
                  
                    {prop.item.game == "BlackjackMulti" && (
                        <>
                            BlackJack - <>{JSON.parse(prop.item.userdata).mode.replace("PerfectPer", "Perfect Pairs")}</>
                        </>
                    )}
                    {prop.item.game == "Baccarat" && prop.item.x > 10 && (
                        <>
                            Baccarat - <>{JSON.parse(prop.item.userdata).seat == 1 ? JSON.parse(prop.item.userdata).mode.replace("Pair", "Perfect Pair").replace("3card", "Either Pair") : JSON.parse(prop.item.userdata).mode.replace("3card", "3 Card")}</>
                        </>
                    )}
                    {prop.item.game == "Baccarat" && prop.item.x <= 10 && (
                        <>
                            Baccarat - <>{JSON.parse(prop.item.userdata).seat}</>
                        </>
                    )}
                    {prop.item.game == "Roulette" && (
                        <>
                            {prop.item.x == 36 ? (
                                <>
                                    Roulette - <>Bet on #{JSON.parse(prop.item.userdata).betId.payload}</>
                                </>
                            ) : (
                                <>
                                    Roulette - <>Bet on {JSON.parse(prop.item.userdata).betId.id}</>
                                </>
                            )}
                        </>
                    )}
                    {prop.item.game == "Wheel" && (
                        <>
                            Wheel - <>Bet on x{JSON.parse(prop.item.userdata).x}</>
                        </>
                    )}
                    {prop.item.game == "777Slot" && (
                        <>
                            777 Slot - <>Bet <ShowAmount amount={JSON.parse(prop.item.userdata).win/JSON.parse(prop.item.userdata).x} /></>
                        </>
                    )}
                    {convertDateToJalali(prop.item.date)}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default Reward;
