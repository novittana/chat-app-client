import css from './ModalAddGroupName.module.css';
import {setIsAddMembersModalOpen, setIsNewGroupModalOpen, setGroupName} from "../../redux/modalsSlice";
import {useDispatch, useSelector} from "react-redux";
import el from "react-timeago/lib/language-strings/el";

function ModalAddGroupName() {
    const groupName = useSelector(state => state.modalsData.groupName);
    const dispatch = useDispatch();
     const onInputChange = (event) => {
         event.preventDefault();
         dispatch(setGroupName(event.target.value));
     }

    const onCancelBtn = () => {
        dispatch(setIsNewGroupModalOpen(false));
    }
    const onNextBtn = () => {
        if (groupName.length !== 0) {
            dispatch(setIsNewGroupModalOpen(false));
            dispatch(setIsAddMembersModalOpen(true));
        }
    }
    return <>
        <div className={css.addGroupWrapper}>
            <div className={css.groupImage}></div>
            <form className={css.groupNameForm} onChange={onInputChange}>
                <label>Group name</label>
                <input className={css.groupNameInput} />
                <button onClick={onNextBtn} type="submit">Next</button>
            </form>
            <div className={css.buttonWrapper}>
                <button onClick={onCancelBtn} type="button">Cancel</button>

            </div>
        </div>

    </>


}

export default ModalAddGroupName;