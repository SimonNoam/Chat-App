import React, {useEffect,useState,useRef} from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute ,host} from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Wellcome from "../components/Wellcome";
import ChatContainer from "../components/ChatContainer";
import {io} from 'socket.io-client';
import Logout from "../components/Logout";

function Chat(){
    const socket = useRef();
    const navigate = useNavigate();
    const [contacts,setContacts] = useState([]);
    const [currentUser,setCurrentUser] = useState(undefined);
    const [currentChat,setCurrentChat] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(()=>{
        const navigationTo = async () =>{
          let userName = sessionStorage.getItem("user");
            if (!localStorage.getItem(userName)){
                navigate("/login");  
            }else{
                setCurrentUser(await JSON.parse(localStorage.getItem(userName)));
                setIsLoaded(true);
            }
         }
         navigationTo();
    },[]);
     
    useEffect(()=>{
       if(currentUser){
        socket.current = io(host);
        socket.current.emit("add-user",currentUser._id);

       }
    },[currentUser]);

    useEffect(()=>{
        const getUsers = async () =>{
        if(currentUser){
            if(currentUser.isAvatarImagesSet){
                const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                let users = [...contacts]
                for(let item of data.data){
                     if(item.connected===true){
                      users.push(item)
                    }
                  }
                  setContacts(users);
            }else{
               navigate("/setAvatar");
            }
           }
         }
       getUsers();
    },[currentUser]);
    
    const handleChatChange = (chat) =>{
       setCurrentChat(chat);
    } 


    return (
        <Container>
           <Logout currentUser={currentUser} />
            <div className="container">

                <Contacts contacts={contacts} 
                currentUser={currentUser} 
                changeChat={handleChatChange}/>
                { isLoaded &&
          currentChat === undefined ?
           <Wellcome currentUser={currentUser}/> : 
          <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
        }
            </div>
        </Container>
    )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;