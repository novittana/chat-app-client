import styled from "styled-components";
import {TfiMenu} from "react-icons/tfi";
import {useState, useEffect} from "react";
import BurgerMenu from "../BurgerMenu";
import axios from "axios";
import {conversationsRoute} from "../../utils/APIRoutes";
import {setConversations, setCurrentConversationList} from "../../redux/conversation/conversationSlice";
import {useDispatch, useSelector} from "react-redux";

function Filter({onMenuBtnClick}) {
    // const user = useSelector(state => state.userData.user);
    // const conversations = useSelector(state => state.conversationData.conversations);
    const dispatch = useDispatch();
    // console.log("conversations",conversations)
    // conversations.filter()


    const conversations = useSelector(state => state.conversationData.conversations);
    const onAllChatsBtnClick = () => {
        dispatch(setCurrentConversationList(conversations))
    }

    const onPrivateBTnClick = () => {
        const privateConversations = conversations.filter(conv => conv.filter === "private");
        dispatch(setCurrentConversationList(privateConversations))
    }

    const onWorkBTnClick = () => {
        const privateConversations = conversations.filter(conv => conv.filter === "work")
        dispatch(setCurrentConversationList(privateConversations))
    }

    return <>
        <FilterContainer>
            <button type="button" className="burger-btn" onClick={onMenuBtnClick}>
                <TfiMenu/>
            </button>
            <ul>
                <li>
                    <button className="menu-btn" onClick={onAllChatsBtnClick}>All chats</button>
                </li>
                <li>
                    <button className="menu-btn" onClick={onPrivateBTnClick}>Private</button>
                </li>
                <li>
                    <button className="menu-btn" onClick={onWorkBTnClick}>Work</button>
                </li>
            </ul>
        </FilterContainer>

    </>

};
export default Filter;

const FilterContainer = styled.div`
  background-color: #231f69;
  height: 100vh;
}

.burger-btn {
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;

  svg {
    width: 2rem;
    height: 2rem;
  }

  .menu-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 4px;
    padding: 5px 10px;
    width: 100px;
    margin-top: 8px;
    font-size: 14px;
    background-color: transparent;
    color: white;
    cursor: pointer;
  }`;
