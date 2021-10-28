import { Link } from 'react-router-dom';
import { useShoppingCart } from '../../context/shoppingCart';
import button from '../../styles/button.module.scss';
import styles from './styles.module.scss';

export function Modal() {

   const { clearShoppingCart } = useShoppingCart();

   return (
      <div className={styles.modalBackground}>
         <div className={styles.modal}>
            <div className={styles.modalWrapper}>
               <h2>Obrigado!</h2>
               <p>Sua compra foi finalizada com sucesso!</p>
               <Link to="/">
                  <button
                     className={button.button}
                     style={{ fontSize: 18, height: 45 }}
                     onClick={() => clearShoppingCart()}
                  >
                     Ir para loja
                  </button>
               </Link>
            </div>
         </div>
      </div>
   )
}