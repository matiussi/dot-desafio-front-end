import { useShoppingCart } from '../../context/shoppingCart';
import styles from '../../styles/sideCard.module.scss';
import scopedStyles from './styles.module.scss';
import button from '../../styles/button.module.scss';

import { BsTrashFill } from 'react-icons/bs';


export function ShoppingCart() {

   const {
      shoppingCart,
      removeMovie,
      clearShoppingCart,
      getTotalValue
   } = useShoppingCart();

   return (
      <aside>
         <div className={styles.sideCard}>
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
                        const { movie, quantity } = cartItem;
                        return (

                           <li className={styles.movie} key={movie.id}>
                              <div className={styles.movieLogo}>
                                 <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} />
                              </div>
                              <div className={styles.movieInfoWrapper}>
                                 <div className={styles.movieTitle}>{movie.title}</div>
                                 <span className={scopedStyles.quantity}>{quantity}</span>
                                 <span className={styles.price}>
                                    R$ {(movie.price * quantity).toFixed(2).replace('.', ',')}
                                 </span>
                              </div>
                              <button
                                 className={scopedStyles.trashIcon}
                                 onClick={() => removeMovie(movie)}
                              >
                                 <BsTrashFill size={20} />
                              </button>
                           </li>
                        )
                     })
               }
            </ul>
            {shoppingCart?.length == 0 ? 
               null
            :
               <div className={scopedStyles.bottom}>
                  <div className={scopedStyles.total}>
                     <p>Total:</p><strong>R$ {getTotalValue().toFixed(2).replace('.', ',')}</strong>
                  </div>
                  <button
                     className={button.button}
                  >
                     Finalizar compra
                  </button>
               </div>
            }
         </div>
      </aside>

   )
}