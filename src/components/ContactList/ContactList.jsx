import {useEffect, useState} from "react";
import axios from "axios";
import {getAllContactsRoute} from "../../utils/APIRoutes";
import ContactItem from "./ContactItem";
import {useSelector} from "react-redux";

function ContactList() {

    const user = useSelector(state => state.userData.user)
    const owner = user._id;
    const [contacts, setContacts] = useState([]);

    useEffect(()=>{
        const getAllContacts = async () => {
            try{
               const response = await axios.get(getAllContactsRoute, {params:{owner}});
               const contacts = response.data;
                setContacts(contacts);
            }catch (error) {
                console.error(error);
            }

        }
        getAllContacts();
    }, [owner]);
    return <>
    <ul>
        <li>{
            contacts.map(contact => {
                return<ContactItem key={contact._id}{...contact}/>
            })
        }
        </li>
    </ul>

    </>;
};


export default ContactList;