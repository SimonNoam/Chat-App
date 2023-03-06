import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";
import { useState,useEffect, useRef } from "react";
import {v4 as uuidv4} from "uuid";
import PlayGame from "./PlayGame";

function ChatContainer({currentChat,currentUser,socket}){
  const navigate = useNavigate();
  const [messages,setMessages] = useState([]);
  const [arrivalMesssage,setArrivaleMessage] = useState(null);
  const [gameRequest, setGameRequest] = useState(null);
  const scrollRef = useRef();
  
    const handleSendMsg = async (msg) =>{
       await axios.post(sendMessageRoute,{
        from: currentUser._id,
        to: currentChat._id,
        message: msg,
        date: new Date()
       });
           //
       socket.current.emit("send-msg",{
        to: currentChat._id,
        from: currentUser._id,
        message: msg,    
       })

       const msgs = [...messages];
       msgs.push({fromSelf:true,message:msg,date:new Date()});
       setMessages(msgs);
    }

    useEffect(() => {
      const fetchData = async () => {
        if(currentChat){
          const response = await axios.post(getAllMessagesRoute, {
            from: currentUser._id,
            to: currentChat._id,
          });
          setMessages(response.data);
        }
      }
      fetchData();
    }, [currentChat]);
  

    useEffect(()=>{
      if(socket.current){
        socket.current.on("msg-recieved",(msg)=>{
          //console.log(msg);
          setArrivaleMessage({fromSelf:false,message:msg,date:new Date()});
        });
        socket.current.on("game-request", (data) => {
          if (data.to === currentUser._id) {
            setGameRequest(data);
          }
         
        });
      }
    },[])

    useEffect(()=>{
      arrivalMesssage && setMessages((prev)=> [...prev,arrivalMesssage]);
    },[arrivalMesssage]);
    
    useEffect(()=>{
      scrollRef.current?.scrollIntoView({behaviour:"smooth"});
    },[messages]);

    const handleAcceptGameRequest = () => {
      socket.current.on("game-request-response", {
        from: currentUser.username,
        to: gameRequest.from,
        accepted: true,
      });
      console.log("Accept game request");
      setGameRequest(null);
      navigate("/game")
    };
    
    const handleDeclineGameRequest = () => {
      socket.current.on("game-request-response", {
        from: currentUser.username,
        to: gameRequest.from,
        accepted: false,
      });
      console.log("Decline game request")
      setGameRequest(null);
      navigate("/")
    };
    
   return (
    <>
      {
        currentChat && (
          <Container>
            <div className="chat-header">
              <div className="user-details">
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                    alt="avatar" />
                </div>
                <div className="username">
                    <h3>{currentChat.username}</h3>
                      {gameRequest && (
                        <div className="game-request">
                                <p>{`${gameRequest.from} wants to play a game with you!`}</p>
                           <div className="game-request-buttons">
                                 <button onClick={handleAcceptGameRequest}>
                                   Accept
                                 </button>
                                  <button onClick={handleDeclineGameRequest}>
                                   Decline
                                 </button>
                           </div>
                       </div>
                    )}
                 </div>
              </div>
              <PlayGame currentChat={currentChat} socket={socket} currentUser={currentUser}/>
              <Logout currentUser={currentUser} />
            </div>
          
      <div className="chat-messages">
            {messages.map((message) => {
          const date = new Date(message.date);
          const formattedDate = date.toLocaleDateString("en-US", {
             weekday: "short",
             month: "short",
             day: "numeric",
             hour: "numeric",
             minute: "numeric",
           });

        return (
             <div ref={scrollRef} key={uuidv4()}
               className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
                <div className="content ">
                    <p>{message.message}</p>
                    <p>{formattedDate}</p>
               </div>
            </div>
           );
       })}
     </div>
          <ChatInput handleSendMsg={handleSendMsg} />
          </Container>
        )
      }
    </>
  );
}

const Container = styled.div`
display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .game-request {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        background-color: #1c1c1c;
        color: #ffffff;
        border-radius: 1rem;
        margin: 1rem 0;
      }
      
      .game-request p {
        font-size: 0.8rem;
        margin: 0;
      }
      
      .game-request-buttons {
        display: flex;
        gap: 1rem;
      }
      
      .game-request-buttons button {
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        background-color: #4f04ff;
        color: #ffffff;
        border: none;
        cursor: pointer;
      }
      
      .game-request-buttons button:hover {
        background-color: #9900ff;
      }
      .username {
        h3 {
          color: white;
          text-transform: capitalize;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
`;
export default ChatContainer;