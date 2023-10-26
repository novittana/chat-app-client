import css from './Backdrop.module.css'

function Backdrop({children}) {
   return  <div className={css.backdrop}>{children}</div>
}

export default Backdrop;