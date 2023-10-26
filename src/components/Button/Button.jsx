import css from './Button.module.css'

function Button({type, name}){
    return <button type={type} className={css.btn}>{name}</button>
}

export default Button;