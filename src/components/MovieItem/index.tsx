import styles from './styles.module.scss';
import mockImage from '../../assets/mock.jpg';
import { BsFillHeartFill, BsStarFill } from 'react-icons/bs';


export function MovieItem() {
   return (
      <>
         <li className={styles.movieItem}>
            <div className={styles.movieItemTop}>
               <div
                  className={styles.movieCover}
                  style={{
                     backgroundImage: `url("https://i.imgur.com/sohWhy9.png")`
                  }}>
                  {/* <img src={mockImage}></img> */}
                  <BsFillHeartFill size={30} className={styles.favourite} />
                  <p className={styles.movieRelease}>
                     7 de Janeiro, 2019
                  </p>
               </div>
            </div>
            <div className={styles.movieBottom}>
               <strong className={styles.movieName}>Nome do Filme</strong>
               <div className={styles.movieInfo}>
                  <div className={styles.movieDetails}>
                     <span className={styles.rating}>
                        <BsStarFill />
                        7
                     </span>
                     <span className={styles.genre}>
                        Gênero
                     </span>
                  </div>
                  <div className={styles.price}>
                     R$ 79,99
                  </div>
               </div>
            </div>
               <button
                  className={styles.button}
               >
                  Adicionar
               </button>
         </li>
      </>
   )
}