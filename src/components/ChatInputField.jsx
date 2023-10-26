import Button from "./Button/Button";
import {useState} from "react";
import Message from "./Chat/Messages/Message";
import io from "socket.io-client";

function ChatInputField() {
    const  socket = io;
    const [messageText, setMessageText] = useState("");

    const handleTyping = () =>
        socket.emit('typing', `${localStorage.getItem('username')} is typing`);

    function createMessage(messageText) {
        return <Message text={messageText}/>

    };
    const handleInputChange = (event) => {
        event.preventDefault();
        setMessageText(event.target.value);
    };

    return (<div>
            <form onSubmit={createMessage}>
                <input onChange={handleInputChange} onKeyDown={handleTyping}/>
                <Button type='submit' name={'Send'}/>
            </form>
        </div>
    );

};

export default ChatInputField;