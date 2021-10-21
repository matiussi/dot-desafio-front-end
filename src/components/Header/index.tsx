import styles from './styles.module.scss';
import { BsSearch, BsFillHeartFill, BsFillCartFill } from 'react-icons/bs';

export function Header() {



   return (
      <header className={styles.header}>
         <div className={styles.headerWrapper}>
            <span className={styles.logo}>LOGO</span>
            <div className={styles.searchbarWrapper}>
               <input
                  type="text"
                  name="searchbar"
                  id="searchbar"
                  placeholder='Pesquisa' />
               <div className={styles.searchIcon}>
                  <BsSearch size={16}/>
               </div>
            </div>
            <div className={styles.iconWrapper}>
               <BsFillHeartFill size={24}/>
               <BsFillCartFill size={24}/>
            </div>
         </div>
      </header>
   )
}