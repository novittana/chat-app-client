import css from './ModalTitle.module.css';

function ModalTitle({title}){
    return <><h3 className={css.moduleTitle}>{title}</h3></>
}

export default ModalTitle;