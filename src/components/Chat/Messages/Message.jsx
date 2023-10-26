import "./message.css";
import TimeAgo from 'react-timeago';

function Message({props}) {
    return <div className="message-with-date">
        <div className="">
            {props.text}
    </div>
        <span><TimeAgo date={props.createdAt}/></span>
        </div>
}

export default Message;