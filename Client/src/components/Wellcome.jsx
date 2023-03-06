import React from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif"

function Wellcome({currentUser}) {
    return (
        <Container>
            <img src={Robot} alt="Robot" />
            <h1>
                Wellcome,<span>{currentUser.username}!</span>
            </h1>
            <h3>please select a chat to messaging with</h3>
        </Container>
    )
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
color: white;
img{
    height: 20rem;
}
span{
    color: #4e00ff;
    text-transform: capitalize;
}
`;

export default Wellcome;