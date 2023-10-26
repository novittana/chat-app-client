import styled from "styled-components";
import DarkModeToggle from "./DarkModeToggle"


function BurgerMenu({active, setActive, user, onContactsBtnClick, onAllUsersBtnClick, onNewGroupBtnClick}){

    return <MenuContainer >
        <div className={active ? "menu active" : "menu"}>

            <div className="menu__list"  onClick={event => event.stopPropagation()}>
                {user && ( <div className="avatar-wrapper">
                    <div className="avatar">{user.isAvatarImageSet ? user.avatarImage : user.username.toUpperCase().slice(0, 2)}</div>
                    <span>{user.username}</span>
                </div>)}
                <ul className="menu__list">
                    <li><button onClick={onNewGroupBtnClick}>New group</button></li>
                    <li><button onClick={onContactsBtnClick}>Contacts</button></li>
                    <li><button onClick={onAllUsersBtnClick}>All users</button></li>
                    <li><button className="dark_thema_toggle-btn">
                        <DarkModeToggle/>>
                    </button></li>
                </ul>
                <div className="blur" onClick={()=>{setActive(false)}}></div>
            </div>

        </div>

    </MenuContainer>
};

export default BurgerMenu;

const MenuContainer = styled.div`
  display: flex;
  position: fixed;
  



.menu {
  z-index: 50;
  width: 30vw;
  height: 100vh;
  position:fixed;
  left: 0;
  top: 0;
  transform: translateX(-130%);
transition: all 0.2s;
}
  
  .menu.active{
    transform: translateX(0);
    .blur {
      z-index: 50;
      width: 88vw;
      height: 100vh;
      left: 12vw;
      backdrop-filter: blur(2px);
      position: absolute;
    }
  }
  
  .avatar-wrapper{
    padding-top:25px;
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: darkblue;
    font-size: 1rem;
    background-color:#231f69;
    .avatar{
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: white;
      font-size: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
  }
  
  .menu__list{
    width: 40%;
    height: 100%;
    background-color:#231f69;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.2s;
  }
//  

`;