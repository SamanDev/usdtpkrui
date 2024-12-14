import React,{useEffect,useState} from "react";

import { Link } from "react-router-dom";
import { Grid, Divider } from "semantic-ui-react";
import { gameDataMain, gameData, gameDataName } from "../../const";
import GameBox from "../../utils/GameBox";
import { getGamesStatus } from "../../services/public";
import Trans from "../../utils/getword";
const GameInbox = (prop) => {
   
    try {
        var defGamesStatus = JSON.parse(localStorage.getItem(  "getGamesStatus"));
      } catch (error) {
        var defGamesStatus = []
      }
    const [sessionmyKey, setSessionmyKey] = useState(defGamesStatus);
    
   
    const handleSession = async () => {
        try {
            const resPoker = await getGamesStatus();
            if (resPoker.status === 200) {
                if (resPoker.data) {
                    setSessionmyKey(resPoker.data);
                    localStorage.setItem("getGamesStatus",JSON.stringify(resPoker.data));
                }
            }
        } catch (error) {}
    };
    useEffect(() => {
        //setMainGame(params.gameId);
        //setsessionmyKey("");

       // if (loginToken?.accessToken && !loginToken?.logout ) {
             handleSession();
        //}
    }, []);
   
    return (
        <>
            <Grid centered  columns="equal" style={{ zIndex: 10, position: "relative", paddingBottom: 100 }}>
                <Grid.Row columns={2}>
                    <Grid.Column mobile={16} tablet={8} computer={8} as={Link} to={"/games/" + gameDataMain[0]} id={"open" + gameDataMain[0]}>
                        <GameBox game={gameDataMain[0]} name={Trans("game_poker")} trigger="loop" height="130px" stroke="20" />
                        <Divider hidden fitted />
                    </Grid.Column>

                    <Grid.Column mobile={16} tablet={8} computer={8} as={Link} to={"/games/" + gameDataMain[1]} id={"open" + gameDataMain[1]} only="tablet computer">
                        <GameBox game={gameDataMain[1]} name={Trans("game_wheel")} trigger="loop" height="130px" stroke="20" />
                        <Divider hidden fitted />
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={8} as={Link} to={"#/games/" + gameDataMain[2]} id={"open" + gameDataMain[2]}>
                        <GameBox game={gameDataMain[2]} name={Trans("game_bet")} height="130px" stroke="20" bg={sessionmyKey?.bet?"":"grayscale(60%)"} />
                        <Divider hidden fitted />
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={8} as={Link}  to={sessionmyKey?.backgammon ? "/games/" + gameDataMain[3]:"#/games/" + gameDataMain[3]} id={"open" + gameDataMain[3]} only="tablet computer">
                        <GameBox game={gameDataMain[3]} name={Trans("game_backgammon")} height="130px" stroke="20" bg={sessionmyKey?.backgammon?"":"grayscale(60%)"}  />
                        <Divider hidden fitted />
                    </Grid.Column>
                    
                </Grid.Row>
                <Grid.Row columns={4}>
                    {gameData.map((submenu, i) => {
                        try {
                            var game = submenu.toLowerCase();
                        //console.log(game,sessionmyKey[game]);
                       
                        return (
                            <Grid.Column mobile={8} tablet={8} computer={4} as={Link} to={sessionmyKey[game]?"/games/" + submenu:"#/games/" + submenu} id={"open" + submenu} key={i}>
                                <GameBox game={submenu} name={gameDataName[i]} height="110px" stroke="16" bg={sessionmyKey[game]?"":"grayscale(60%)"} />
                                <Divider hidden fitted />
                            </Grid.Column>
                        );
                        } catch (error) {
                            var game = submenu.toLowerCase();
                        console.log(game,sessionmyKey);
                       
                        return <></>;
                        }
                        
                    
                    })}
                </Grid.Row>
            </Grid>
        </>
    );
};

export default GameInbox;
