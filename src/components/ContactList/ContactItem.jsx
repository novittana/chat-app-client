
function ContactItem({_id, firstName, lastName, phoneNumber}){
    return (
        <>
        <div></div>
        <div>
            <h3>{firstName} {lastName}</h3>
            <p>{phoneNumber}</p>
            <p>offline</p>
        </div>
    </>
    )
};

export default ContactItem;