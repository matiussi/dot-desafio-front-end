import styles from './styles.module.scss';
import { BsSearch, BsFillHeartFill, BsFillCartFill } from 'react-icons/bs';
import { useState, FormEvent } from 'react';
import { ShoppingCart } from '../ShoppingCart';
import { getMovies } from '../../helpers/api';

import { useSearch } from '../../context/search';
import { Favourites } from '../Favourites';
import { useShoppingCart } from '../../context/shoppingCart';
import { Link, Redirect, useLocation, useHistory } from 'react-router-dom';
import { useFavourite } from '../../context/favourite';


export function Header() {

   //Estado que armazena o valor digitado pelo usuário na barra de busca
   const [query, setQuery] = useState('');

   const { setSearch} = useSearch();
   const {favouriteActive, handleFavouriteActive} = useFavourite();
   const { getNumberOfMovies, cartActive, handleCartActive } = useShoppingCart();

   const {pathname} = useLocation();
   const history = useHistory();
   
   async function handleSearchMovie(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      
      if (query !== '') {
         getMovies(`/search/movie?query=${query}`);
         setSearch({
            query: query
         });
         if(pathname === '/checkout'){
            history.push('/');
         }
      }
   }

   function handleFavouriteDisplay(){
      handleFavouriteActive(!favouriteActive);
      handleCartActive(false);
   }
   function handleShoppingCartDisplay(){
      handleCartActive(!cartActive);
      handleFavouriteActive(false);
   }

   return (
      <>
         <header className={styles.header}>
            <div className={styles.headerWrapper}>
               <Link to={'/'}>
                  <span className={styles.logo}>LOGO</span>
               </Link>
               <form
                  role='search'
                  className={styles.searchbarWrapper}
                  onSubmit={(event) => handleSearchMovie(event)}
               >
                  <input
                     type="text"
                     name="searchbar"
                     id="searchbar"
                     placeholder='Pesquisa'
                     value={query}
                     onChange={(event) => setQuery(event.target.value)}
                  />
                  <button
                     className={styles.searchIcon}
                     title='Pesquisar'
                     type='submit'
                  >
                     <BsSearch size={16} />
                  </button>
               </form>
               <div className={styles.iconWrapper}>
                  <button
                     title='Filmes favoritos'
                     onClick={() => handleFavouriteDisplay()}
                  >
                     <BsFillHeartFill
                        size={24}
                     />
                  </button>
                  <button title='Carrinho de compras'
                     onClick={() => handleShoppingCartDisplay()}
                  >
                     <BsFillCartFill
                        size={24}
                     />
                     <span className={styles.numberOfMovies}>
                        {getNumberOfMovies()}
                     </span>
                  </button>
               </div>
            </div>
         </header>
         {favouriteActive ? <Favourites /> : null}
         {cartActive ? <ShoppingCart /> : null}
      </>
   )
}

