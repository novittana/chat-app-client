import styled from "styled-components";
import {useEffect, useRef, useState} from "react";
import {IoMdSend} from "react-icons/io";
import axios from "axios";
import {messageRoute} from "../utils/APIRoutes";
import {setMessages} from "../redux/messageSlice";
import {useDispatch, useSelector} from "react-redux";
import io from "socket.io-client";


function ChatInput() {
    const conversation = useSelector(state => state.conversationData.currentConversation);
    const user = useSelector(state => state.userData.user);
    const messages = useSelector(state => state.messagesData.messages)
    const dispatch = useDispatch();
    // const receiverId = useSelector(state => state.conversationData.currentReceiverId);
    const [newMessage, setNewMessage] = useState("");
    // const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const socket = useRef();
    // console.log("user", user
    // )



    useEffect(() => {
        socket.current = io("ws://localhost:5000");
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender:data.senderId,
                text:data.text,
                createAt: Date.now(),
            })
        })
    }, []);

//Подумати, як зробити повідомлення про тайпінг
    // const handleTyping = () =>{
    //     socket.current = io("ws://localhost:5000");
    //     socket.current('typing', `${localStorage.getItem('username')} is typing`);
    // }


    useEffect(()=>{
        arrivalMessage &&
            conversation?.members.includes(arrivalMessage.sender) &&
        setMessages((prev) => [...prev, arrivalMessage]);

        console.log(arrivalMessage)
    }, [arrivalMessage, conversation])

    useEffect(()=>{
        if (user._id !== ""){
            socket.current.emit("addUser", user._id);
            socket.current.on("getUsers", users =>{
                console.log("users",users)
            })
        }
    }, [user])

 const handleCreateMsg = async () => {

     const data = await axios.post(messageRoute, {
         conversationId: conversation._id,
         sender: user._id,
         text: newMessage
     });
 }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const msg = {
            sender:user._id,
            text:newMessage,
            conversationId: conversation._id
        }

        const receiverId = conversation.members.find(member => member !== user._id);

        socket.current.emit("sendMessage", {
            senderId:user._id,
            receiverId,
            text:newMessage,
        })
            if (newMessage.length > 0 && user._id !== "") {
                handleCreateMsg(newMessage);
                setNewMessage('');
                    }

            try {
                const res = await axios.post(messageRoute, newMessage);
                setMessages([...messages, res.data]);
                setNewMessage("");
            }catch (err) {
                console.log(err);
            }

        }



    return <Container>
        <form className="input-container" id="input-container" onSubmit={handleSubmit}>
            <input type="text" placeholder="type your message here" value={newMessage} onChange={(e)=>setNewMessage(e.target.value)}/>
            <button className="submit">
                <IoMdSend/>
            </button>
        </form>
    </Container>
}

export default ChatInput;

const Container = styled.div`
  width: -webkit-fill-available;
  position: absolute;
  bottom: 0;
  display: grid;
  align-items: center;
  //grid-template-columns: 5% 95%;
  background-color: #e0e0e1;
  padding: 0 2rem;
  padding-bottom: 0.3rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }

  .input-container {
    
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;

    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }

      &:focus {
        outline: none;
      }
    }

    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #2a9ef6;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }

      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }

\`       ;`;