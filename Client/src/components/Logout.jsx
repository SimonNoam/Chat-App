import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";
import {BiPowerOff} from 'react-icons/bi'
import {toast} from "react-toastify";
function Logout({currentUser}){
    const navigate = useNavigate();
    
    const toastOptions = {
      position:"bottom-right",
      autoClose:8000,
      pauseOnHover:true,
      draggable:true,
      theme:"dark"
    }

    const handleClick = async () =>{
      let userName = sessionStorage.getItem("user");
      const user = await JSON.parse(localStorage.getItem(userName));
      if (user!= null) {
        const {data} = await axios.post(`${logoutRoute}/${user._id}`,{
          connected: false,
       });
       
       if(data.status=== true){
        localStorage.removeItem(userName);
        sessionStorage.removeItem("user");
        navigate('/login');
       }
       else if(data.status === false){
        toast.error(data.msg,toastOptions)
      } 
    }
  }
  return (
    <Button onClick={handleClick}>
        <BiPowerOff/>
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

`;
export default Logout;