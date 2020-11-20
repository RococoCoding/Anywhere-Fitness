import React from "react";
import Login from "./Login";
import styled from "styled-components";

export default function Registered() {

    return(
        <StyledCongrats>
            <h1 className="congrats">Congratulations! You've been successfully registered. You may now log in.</h1>
            <Login />
        </StyledCongrats>
    )
}

const StyledCongrats = styled.div`
    .congrats {
        font-size: 1.5rem;
        font-weight: bold;
        position: fixed;
        top: 20%;
        left: 33%;
        width: 40%;
    }
`