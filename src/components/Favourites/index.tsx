import { useFavourite } from '../../context/favourite';
import styles from '../../styles/sideCard.module.scss';

import { BsTrashFill, BsFillCartFill } from 'react-icons/bs';
import { useShoppingCart } from '../../context/shoppingCart';

export function Favourites() {

   const { favourite, clearFavourites, removeFavourite } = useFavourite();
   const { addMovie } = useShoppingCart();

   return (
      <aside >
         <div className={styles.sideCard}>
            <div className={styles.sideCardTop}>
               <p>Meus Favoritos</p>
               <button onClick={() => clearFavourites()}>Esvaziar</button>
            </div>
            <ul className={styles.sideCardWrapper}>
               {
                  favourite?.length == 0 ?
                     <li><p>Você não possui filmes favoritos :(</p></li>
                     :
                     favourite?.map(movie => {
                        return (

                           <li className={styles.movie} key={movie.id}>
                              <div className={styles.movieLogo}>
                                 <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} />
                              </div>
                              <div className={styles.movieInfoWrapper}>
                                 <div className={styles.movieTitle}>{movie.title}</div>
                                 <span className={styles.price}>
                                    R$ {(movie.price).toFixed(2).replace('.', ',')}
                                 </span>
                              </div>
                              <div className={styles.iconWrapper}>
                                 <button
                                    className={styles.shoppingCartIcon}
                                    onClick={() => addMovie(movie, 1)}
                                 >
                                    <BsFillCartFill size={20} />
                                 </button>
                                 <button
                                    className={styles.trashIcon}
                                    onClick={() => removeFavourite(movie)}
                                 >
                                    <BsTrashFill size={20} />
                                 </button>
                              </div>
                           </li>

                        )
                     })
               }
            </ul>
         </div>
      </aside>

   )
}