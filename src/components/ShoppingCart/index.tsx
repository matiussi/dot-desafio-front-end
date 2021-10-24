import { useShoppingCart } from '../../context/shoppingCart';
import styles from '../../styles/sideCard.module.scss';
import scopedStyles from './styles.module.scss';

import { BsTrashFill} from 'react-icons/bs';

export function ShoppingCart() {

   const { 
      shoppingCart, 
      removeMovie, 
      clearShoppingCart, 
      getTotalValue 
   } = useShoppingCart();

   return (
      <aside className={styles.sideCard}>
         <div className={styles.sideCardTop}>
            <p>Meu Carrinho</p>
            <button onClick={() => clearShoppingCart()}>Esvaziar</button>
         </div>
         <ul className={styles.sideCardWrapper}>
            {
               shoppingCart?.length == 0 ?
                  <li><p>Carrinho de compras vazio</p></li>
                  :
                  shoppingCart?.map(cartItem => {
                     const {movie, quantity} = cartItem;
                     return (

                        <li className={styles.movie} key={movie.id}>
                           <div className={styles.movieLogo}>
                              <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} />
                           </div>
                           <div className={styles.movieInfoWrapper}>
                              <div className={styles.movieTitle}>{movie.title}</div>
                              <span className={scopedStyles.quantity}>{quantity}</span>
                              <span className={styles.price}>R$ 9,99</span>
                           </div>
                           <div className={styles.iconWrapper}>
                              
                              <button
                                 className={styles.trashIcon}
                                 onClick={() => removeMovie(movie)}
                              >
                                 <BsTrashFill size={20} />
                              </button>
                           </div>
                        </li>

                     )
                  })
            }
         </ul>
      </aside>

   )
}