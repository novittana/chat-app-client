import ModalWindow from "./ModalWindow/ModalWindow";
import ModalTitle from "./ModalTitle/ModalTitle";
import NewContactForm from "./NewContactForm/NewContactForm";
import Button from "./Button/Button";
import button from "./Button/Button";

function AddNewContact() {
    return <>
        <ModalWindow>
            <ModalTitle title={'New contact'}/>
            <NewContactForm/>
            <Button name={"Cansel"} type={button}></Button>
        </ModalWindow>
    </>
}

export default AddNewContact;