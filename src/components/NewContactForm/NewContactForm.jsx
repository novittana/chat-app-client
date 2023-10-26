import Button from "../Button/Button";
import css from './NewContactForm.module.css'
import {BiUser,} from "react-icons/bi";
import {FiPhone} from "react-icons/fi";
import {useState} from "react";
import {ToastContainer, toast} from "react-toastify";
import axios from "axios";
import {addContactRoute} from "../../utils/APIRoutes";
import {useDispatch, useSelector} from "react-redux";
import {setIsNewGroupModalOpen, setIsContactsModalOpen, setIsAllUsersModalListOpen, setIsContactModal} from "../../redux/modalsSlice";

function NewContactForm() {
    const user = useSelector(state => state.userData.user);
    const isContactModal = useSelector(state => state.modalsData.isContactModal);
    const dispatch = useDispatch();

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    };

    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: ""
    })
    const handleChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
if(validateForm){
    const {firstName, lastName,  phoneNumber} = values;
    const {data} = await axios.post(addContactRoute, {
        firstName,
        lastName,
        phoneNumber,
        owner: user,
    });
    if(data.status === false){
        toast.error(data.msg, toastOptions);
    }
    setValues({
        firstName: "",
        lastName: "",
        phoneNumber: ""
    });
    dispatch(setIsContactModal(false));
    dispatch(setIsContactsModalOpen(true));
}

    }

    const validateForm = () => {
        const {firstName, lastName,  phoneNumber} = values;
        if(firstName.length<3){
            toast.error("First name should be greater than 3 characters", toastOptions)
            return false;
        }
        if(lastName.length<3){
            toast.error("Last name should be greater than 3 characters", toastOptions);
            return false;
        }
        if (phoneNumber.length<10){
            toast.error("Phone Number should be greater than 10 characters", toastOptions)
            return false;
        }
        return true;
    }

    return <>
        <form className={css.contactForm} onSubmit={(event) => {
            handleSubmit(event)
        }}>
            <label><BiUser/> First name</label>
            <input type="text" name="firstName" className={css.contactInput} onChange={e => handleChange(e)} required/>
            <label>Last name</label>
            <input type="text" name="lastName" className={css.contactInput} onChange={e => handleChange(e)} required/>
            <label><FiPhone/> Phone Number</label>
            <input type="tel" name="phoneNumber" className={css.contactInput} onChange={e => handleChange(e)} required/>

            <Button name={"Create"}/>
        </form>
        <ToastContainer/>
    </>

};

export default NewContactForm;