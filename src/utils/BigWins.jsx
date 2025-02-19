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
                        <small>
                            BlackJack - <small>{JSON.parse(prop.item.userdata).mode.replace("PerfectPer", "Perfect Pairs")}</small>
                        </small>
                    )}
                    {prop.item.game == "Baccarat" && prop.item.x > 10 && (
                        <small>
                            Baccarat - <small>{JSON.parse(prop.item.userdata).seat == 1 ? JSON.parse(prop.item.userdata).mode.replace("Pair", "Perfect Pair").replace("3card", "Either Pair") : JSON.parse(prop.item.userdata).mode.replace("3card", "3 Card")}</small>
                        </small>
                    )}
                    {prop.item.game == "Baccarat" && prop.item.x <= 10 && (
                        <small>
                            Baccarat - <small>{JSON.parse(prop.item.userdata).seat}</small>
                        </small>
                    )}
                    {prop.item.game == "Roulette" && (
                        <>
                            {prop.item.x == 36 ? (
                                <small>
                                    Roulette - <small>Bet on #{JSON.parse(prop.item.userdata).betId.payload}</small>
                                </small>
                            ) : (
                                <small>
                                    Roulette - <small>Bet on {JSON.parse(prop.item.userdata).betId.id}</small>
                                </small>
                            )}
                        </>
                    )}
                    {prop.item.game == "Wheel" && (
                        <small>
                            Wheel - <small>Bet on x{JSON.parse(prop.item.userdata).x}</small>
                        </small>
                    )}
                    {prop.item.game == "777Slot" && (
                        <small>
                            777 Slot - <small>Bet <ShowAmount amount={JSON.parse(prop.item.userdata).win/JSON.parse(prop.item.userdata).x} /></small>
                        </small>
                    )}
                    {convertDateToJalali(prop.item.date)}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default Reward;
