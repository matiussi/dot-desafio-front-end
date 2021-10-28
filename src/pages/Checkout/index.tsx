import { useShoppingCart } from '../../context/shoppingCart';
import styles from './styles.module.scss';
import button from '../../styles/button.module.scss';

import { currency } from '../../helpers/format';
import { BsTrashFill, BsFillCartXFill } from 'react-icons/bs';
import { useForm } from "react-hook-form";
import { Modal } from '../../components/Modal';

import {
   addressPattern,
   cepPattern,
   cityPattern,
   cpfPattern,
   emailPattern,
   namePattern,
   phonePattern,
   statePattern
} from '../../helpers/inputValidation';
import { useState } from 'react';
import { useFavourite } from '../../context/favourite';

export function Checkout() {

   const { shoppingCart, getTotalValue, removeMovie, handleCartActive } = useShoppingCart();
   const { handleFavouriteActive } = useFavourite();

   const { register, handleSubmit, formState: { errors } } = useForm();

   const [showModal, setShowModal] = useState(false);


   const onSubmit = () => {
      setShowModal(true);
   }
   return (
      <>
         {showModal ? <Modal /> : null}
         <main>
            <div className={styles.checkoutWrapper}>
               {shoppingCart?.length == 0 ?
                  <div className={styles.noItens}>
                     <BsFillCartXFill size={40} />
                     <h1>Adicione itens ao seu carrinho para continuar.</h1>
                  </div>
                  :
                  <>
                     <form 
                        id="checkoutForm" 
                        onSubmit={handleSubmit(onSubmit)} 
                        className={styles.checkoutForm} 
                     >
                        <h1>Finalizar Compra</h1>
                        <label
                           className={styles.errorMessage}
                           htmlFor='name'
                        >
                           {errors.name && errors.name.message}
                        </label>
                        <input
                           id="name"
                           type="text"
                           placeholder='Nome completo'
                           title='Informe seu nome completo'
                           className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                           {...register('name', {
                              required: true,
                              pattern: {
                                 value: namePattern,
                                 message: 'Nome inválido',
                              },
                           })}
                           required
                        />
                        <div className={styles.fieldsetWrapper}>
                           <fieldset className={styles.inputMedium}>
                              <label
                                 className={styles.errorMessage}
                                 htmlFor='cpf'
                              >
                                 {errors.cpf && errors.cpf.message}
                              </label>
                              <input
                                 id='cpf'
                                 type="text"
                                 placeholder='CPF'
                                 title='Informe seu CPF, apenas números'
                                 maxLength={11}
                                 className={`${styles.input} ${errors.cpf ? styles.inputError : ''}`}
                                 {...register('cpf', {
                                    required: true,

                                    pattern: {
                                       value: cpfPattern,
                                       message: 'CPF inválido',
                                    },
                                 })}
                              />
                           </fieldset>
                           <fieldset className={styles.inputMedium}>
                              <label
                                 className={styles.errorMessage}
                                 htmlFor='phone'
                              >
                                 {errors.phone && errors.phone.message}
                              </label>
                              <input
                                 id='phone'
                                 type="tel"
                                 placeholder='Celular'
                                 title='Informe seu número de celular, apenas números'
                                 maxLength={11}
                                 className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                                 {...register('phone', {
                                    required: true,
                                    pattern: {
                                       value: phonePattern,
                                       message: 'Celular inválido',
                                    },
                                 })}
                              />
                           </fieldset>
                        </div>
                        <label
                           className={styles.errorMessage}
                           htmlFor='email'
                        >
                           {errors.email && errors.email.message}
                        </label>
                        <input
                           id='email'
                           type="email"
                           placeholder='E-mail'
                           title='Informe seu e-mail'
                           className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                           {...register('email', {
                              required: true,
                              pattern: {
                                 value: emailPattern,
                                 message: 'E-mail inválido',
                              },
                           })}
                        />
                        <div className={styles.fieldsetWrapper}>
                           <fieldset className={styles.inputSmall}>
                              <label
                                 className={styles.errorMessage}
                                 htmlFor='cep'
                              >
                                 {errors.cep && errors.cep.message}
                              </label>
                              <input
                                 id='cep'
                                 type="text"
                                 placeholder='CEP'
                                 title='Informe seu CEP, apenas números'
                                 maxLength={8}
                                 className={`${styles.input} ${errors.cep ? styles.inputError : ''}`}
                                 {...register('cep', {
                                    required: true,
                                    pattern: {
                                       value: cepPattern,
                                       message: 'CEP inválido',
                                    },
                                 })}
                              />
                           </fieldset>
                           <fieldset>
                              <label
                                 className={styles.errorMessage}
                                 htmlFor='address'
                              >
                                 {errors.address && errors.address.message}
                              </label>
                              <input
                                 type="text"
                                 placeholder='Endereço'
                                 title='Informe seu endereço'
                                 className={`${styles.input} ${errors.address ? styles.inputError : ''}`}
                                 {...register('address', {
                                    required: true,
                                    pattern: {
                                       value: addressPattern,
                                       message: 'Endereço inválido',
                                    },
                                 })}
                              />
                           </fieldset>
                        </div>
                        <div className={styles.fieldsetWrapper}>
                           <fieldset className={styles.inputMedium}>
                              <label
                                 className={styles.errorMessage}
                                 htmlFor='city'
                              >
                                 {errors.city && errors.city.message}
                              </label>
                              <input
                                 id='city'
                                 type="text"
                                 placeholder='Cidade'
                                 title='Informe sua cidade'
                                 className={`${styles.input} ${errors.city ? styles.inputError : ''}`}
                                 {...register('city', {
                                    required: true,
                                    pattern: {
                                       value: cityPattern,
                                       message: 'Cidade inválido',
                                    },
                                 })}
                              />

                           </fieldset>
                           <fieldset className={styles.inputMedium}>
                              <label
                                 className={styles.errorMessage}
                                 htmlFor='state'
                              >
                                 {errors.state && errors.state.message}
                              </label>
                              <input
                                 type="text"
                                 placeholder='Estado'
                                 title='Informe seu estado'
                                 className={`${styles.input} ${errors.state ? styles.inputError : ''}`}
                                 {...register('state', {
                                    required: true,
                                    pattern: {
                                       value: statePattern,
                                       message: 'Estado inválido',
                                    },
                                 })}
                              />
                           </fieldset>
                        </div>
                     </form>
                     <div className={styles.checkoutItems}>
                        <table>
                           <thead>
                              <tr>
                                 <th>Imagem</th>
                                 <th>Nome</th>
                                 <th>Qtd</th>
                                 <th>Preço</th>
                                 <th></th>
                              </tr>
                           </thead>

                           {shoppingCart?.map(shoppingItem => {
                              const { movie, quantity } = shoppingItem;
                              return (
                                 <tbody key={movie.id}>
                                    <tr>
                                       <td><div className={styles.poster}><img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} /></div></td>
                                       <td>{movie.title}</td>
                                       <td className={styles.quantity}>{quantity}</td>
                                       <td className={styles.price}>{currency(movie.price * quantity)}</td>
                                       <td>
                                          <button
                                             className={styles.trashIcon}
                                             onClick={() => removeMovie(movie)}
                                             title="Remover do carrinho"
                                          >
                                             <BsTrashFill size={20} />
                                          </button>
                                       </td>
                                    </tr>
                                 </tbody>
                              )
                           })
                           }
                        </table>
                        <div className={styles.bottom}>
                           <div className={styles.total}>
                              <p>Total:</p><p className={styles.totalValue}>{currency(getTotalValue())}</p>
                           </div>
                           <button
                              className={button.button}
                              style={{ fontSize: 18, height: 45 }}
                              type='submit'
                              form="checkoutForm"
                              onClick={() => (handleCartActive(false), handleFavouriteActive(false))}
                           >
                              Finalizar
                           </button>

                        </div>
                     </div>
                  </>
               }
            </div>
         </main>
      </>
   )
}