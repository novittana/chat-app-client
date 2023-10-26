// import styled from "styled-components";
// import {useNavigate} from "react-router-dom";
// import {useState, useEffect} from "react";
// import {ToastContainer, toast} from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"
// import axios from "axios";
// import {Buffer} from "buffer";
// import {setAvatarRoute} from "../utils/APIRoutes";
// import loader from "../../src/assets/loader.gif"
//
// export default function SetAvatar() {
//     const api = "https://api.multiavatar.com/45678945";
//     const navigate = useNavigate();
//     const [avatars, setAvatars] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [selectedAvatar, setSelectedAvatar] = useState(undefined);
//
//     const toastOptions = {
//         position: "bottom-right",
//         autoClose: 8000,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "dark",
//     };
//     useEffect(()=> {
//         const func = async () => {
//             if(!localStorage.getItem('chat-app-user')) {
//                 navigate('/login');
//             }
//         }
//     }, [])
//
//     const setProfilePicture = async () => {
//         if(selectedAvatar ===undefined){
//             toast.error("Please select an avatar", toastOptions)
//         } else {
//             const user = await JSON.parse(localStorage.getItem("chat-app-user"));
//             console.log("USER!!!!!"+user)
//             const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
//                 image: avatars[selectedAvatar],
//             });
//
//             console.log("DATA!!!!!!"+data)
//             if (data.isSet) {
//                 user.isAvatarImageSet = true;
//                 user.avatarImage = data.image;
//                 localStorage.setItem("chat-app-user", JSON.stringify(user));
//                 navigate("/")
//             } else {
//                 toast.error("Error setting avatar. Please try again", toastOptions)
//             }
//         }
//     }
//
//
//
//     useEffect(() => {
//         const data = [];
//         const func = async () => {
//
//             for (let i = 0; i < 4; i++) {
//
//                 const image = await axios.get(
//                     `${api}/{Math.round(Math.random()*1000)}`
//                 ) ;
//                 console.log("image"+image)
//                 const buffer = new Buffer(image.data);
//                 data.push(buffer.toString("base64"));
//             }
//             setAvatars(data);
//             setIsLoading(false);
//         }
//         func();
//     },[]);
//
//
//
//
//     return (
//         <>
//             {isLoading ? <Container>
//                 <img src={loader} alt="loader" className="loader"/>
//             </Container> : (<Container>
//                 <div className="title-container">
//                     <h1> Pick an avatar as your profile picture</h1>
//                 </div>
//                 <div className="avatars">
//                     {avatars.map((avatar, index) => {
//                         return (
//                             <div
//
//                                 className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
//                                 <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar"
//                                      key={index}
//                                      onClick={() => setSelectedAvatar(index)}
//                                 />
//                             </div>
//                         )
//                     })
//                     }
//                 </div>
//                 <button className="submit-btn" onClick={setProfilePicture}>Set as Profile</button>
//             </Container>) }
//             <ToastContainer/>
//
//         </>)
// }
//
// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   gap: 3rem;
//   background-color: #131324;
//   height: 100vh;
//   width: 100vw;
//
//   .loader {
//     max-inline-size: 100%;
//   }
//   .title-container {
//     h1 {
//       color: white;
//     }
//       }
//   .avatars {
//     display: flex;
//     gap: 2rem;
//
//     .avatar {
//       border: 0.4rem solid transparent;
//       padding: 0.4rem;
//       border-radius: 5rem;
//       display: flex;
// justify-content: center;
//       align-items: center;
//       transition: 0.5ms ease-in-out;
//       img {
//         height: 6rem;
//       }
//       }
//     .selected {
//       border: 0.4rem solid #40a7e3;
//     }
//     }
//   .submit-btn{
//     background-color: #997af0;
//     color: white;
//     padding: 1rem 2rem;
//     border: none;
//     font-weight: bold;
//     cursor: pointer;
//     border-radius: 0.4rem;
//     font-size: 1rem;
//     text-transform: uppercase;
//     transition: 0.5s ease-in-out;
//
//     &:hover {
//       background-color: #4e0eff;
//     }
//   }
// `;