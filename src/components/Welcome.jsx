import styled from "styled-components";
import Robot from '../assets/robot.gif'


function Welcome({currentUser}) {

    return (

    <>
        {
            currentUser &&
            (<Container>
                <img src={Robot} alt="Robot"/>
                <h1>Welcome, <span>{currentUser.username}</span>!</h1>
                <h3>Please, select a chat to start messages</h3>
            </Container>)
        }
    </>)

}

export default Welcome;


const Container = styled.div`
    color: white;
margin: 0 auto;
  
`;