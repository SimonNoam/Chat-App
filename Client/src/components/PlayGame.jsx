import styled from "styled-components"
import {BiCaretRightSquare} from 'react-icons/bi'
const PlayGame = ({currentChat,socket,currentUser})=>{
    
    const onGameRequest = () =>{
        console.log(currentChat._id)
        socket.current.emit("game-request",{
            to: currentChat._id,
            from: currentUser._id,
        })
    }
   return (
      <Button onClick={onGameRequest}>
        <BiCaretRightSquare/>
      </Button>
   )
}

const Button = styled.button`
display: flex;
justify-content: center;
align-items: center;
padding: 0.5rem;
border-radius: 0.5rem;
background-color: #9a86f3;
border: none;
cursor: pointer;
svg {
  font-size: 1.3rem;
  color: #ebe7ff;
}
line-height: 12px;
width: 40px;
font-size: 8pt;
font-family: tahoma;
margin-top: 75px;
margin-right: 180px;
position:absolute;
top:0;
right:0;

`;
export default PlayGame