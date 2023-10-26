// import styled from "styled-components";
// import {useState, useEffect, useRef} from "react";
// import {useNavigate} from "react-router-dom";
// import {allUsersRoute, host} from "../utils/APIRoutes";
// import axios from "axios";
// import Contacts from "../components/Contacts/Contacts";
// import Welcome from "../components/Welcome";
// import ChatContainer from "../components/ChatContainer";
// import {io} from "socket.io-client"
//
// function Chat() {
//     const socket = useRef();
//     const [contacts, setContacts] = useState([]);
//     const [currentChat, setCurrentChat] = useState(undefined)
//     const [currentUser, setCurrentUser] = useState(undefined);
//     const [isLoaded, setIsLoaded] = useState(false);
//     const navigate = useNavigate();
//     useEffect(() => {
//         const func = async () => {
//             if (!localStorage.getItem("chat-app-user")) {
//                 navigate('/login');
//             } else {
//                 setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
//                 setIsLoaded(true)
//             }
//         }
//         func();
//     }, []);
//
//     useEffect(()=>{
// if(currentUser){
//     console.log("!!!!!"+socket.current)
//     socket.current = io(host);
//     socket.current.emit("add-user", currentUser._id);
// }
//     }, [currentUser])
//
//     useEffect(() => {
//         const func = async () => {
//             if (currentUser) {
//                 // if (currentUser.isAvatarImageSet) {
//                     const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
//                     setContacts(data.data)
//                 console.log((contacts))
//                 // } else {
//                 //     navigate('/setAvatar')
//                 // }
//             }
//         }
//         func();
//
//     }, [currentUser])
//
//     const handleChatChange = (chat) => {
//         setCurrentChat(chat);
//     }
//
//     console.log(currentUser)
//     return <Container>
//         <div className="container">
//             <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
//             {currentChat === undefined ? (
//                 <Welcome currentUser={currentUser}/>
//             ) : (
//                 <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
//             )}
//
//
//         </div>
//     </Container>
// }
//
// export default Chat;
//
// const Container = styled.div`
//   height: 100vh;
//   width: 100vw;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   gap: 1rem;
//   align-items: center;
//   background-color: #131324;
//
//   .container {
//     height: 85vh;
//     width: 85vw;
//     background-color: #00000060;
//     display: grid;
//     grid-template-columns: 25% 75%;
//     @media screen and (min-width: 720px) and (max-width: 1080px) {
//       grid-template-columns: 35% 65%;
//     }
//   }
//
// `;

