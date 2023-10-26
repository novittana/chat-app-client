import css from './ModalWindow.module.css'

function ModalWindow ({children}) {
    return <div className={css.modalWindow}>
        {children}
    </div>
};

export default ModalWindow;