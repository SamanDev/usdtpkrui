import React from "react";
import { Segment, Button } from "semantic-ui-react";

import Trans from "../../../utils/getword";
const Balance = (prop) => {
    return (
        <>
            <Segment
                className="myaccount"
                inverted
                size="tiny"
                basic
                style={{
                    margin: 0,
                    padding: 8,
                    color: "#fff",
                    background: "transparent",
                    position: "relative",
                }}
            >
                <Button color="orange" size="small" className="farsi" basic id="openLogin" onClick={() => prop.setFirstOpen(true)}>
                    {Trans("login")}
                </Button>{" "}
                <Button color="yellow" size="small" basic className="farsi" id="openRegister" onClick={() => prop.setSecondOpen(true)}>
                    {Trans("signup")}
                </Button>
            </Segment>
        </>
    );
};

export default Balance;
