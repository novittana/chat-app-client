import Filter from "../components/Filter/Filter";
import styled from "styled-components";
import Chat from "../components/Chat/Chat"
import ChatList from "../components/Chat/ChatList";
import BurgerMenu from "../components/BurgerMenu";
import {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import ContactModal from "../components/ContactModal";
import AllUsersListModal from "../components/AllUsersListModal";
import NewGroupModal from "../components/NewGroupModal";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentUser} from "../redux/user/userSlice";
import {setIsNewGroupModalOpen, setIsContactsModalOpen, setIsAllUsersModalListOpen} from "../redux/modalsSlice";


export default function HomePage() {
    const navigate = useNavigate();
    const [menuActive, setMenuActive] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const isNewGroupModalOpen = useSelector(state => state.modalsData.isNewGroupModalOpen);
    const dispatch = useDispatch();

    const onMenuBtnClick = () => {
        setMenuActive(!menuActive);
    }

    const onNewGroupBtnClick = () => {
        setMenuActive(false);
        dispatch(setIsNewGroupModalOpen(true));
    }

    const onContactsBtnClick = () =>{
         setMenuActive(false);
        dispatch(setIsContactsModalOpen(true));
    }

    const onAllUsersBtn = () => {
        setMenuActive(false);
        dispatch(setIsAllUsersModalListOpen(true));
    }

    useEffect(() => {
        const func = async () => {

            if (!localStorage.getItem("chat-app-user")) {
                navigate('/login');
            } else {
                dispatch(setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user"))));
                setIsLoaded(true)
            }
        }
        func();
    }, []);

    return <>
        <HomePageContainer>
            <Filter onMenuBtnClick={onMenuBtnClick}/>
            <BurgerMenu active={menuActive} setActive={setMenuActive} onContactsBtnClick={onContactsBtnClick} onNewGroupBtnClick={onNewGroupBtnClick} onAllUsersBtnClick={onAllUsersBtn} />
            <Chat/>
            <NewGroupModal/>
            <ContactModal/>
            <AllUsersListModal/>
        </HomePageContainer>
    </>

}


const HomePageContainer = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 10% 90%;
`;
