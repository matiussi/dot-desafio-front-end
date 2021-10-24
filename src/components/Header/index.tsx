import styles from './styles.module.scss';
import { BsSearch, BsFillHeartFill, BsFillCartFill } from 'react-icons/bs';
import { useState, FormEvent } from 'react';
import {ShoppingCart} from '../ShoppingCart';
import { getMovies } from '../../helpers/api';

import {useSearch} from '../../context/search';
import { Favourites } from '../Favourites';


export function Header() {

   //Estado que armazena o valor digitado pelo usuário
   const [query, setQuery] = useState('');

   const {setSearch} = useSearch();

   const [toggleFavourite, setToggleFavourite] = useState<boolean>(false);
   const [toggleShoppingCart, setToggleShoppingCart] = useState<boolean>(false);

   async function handleSearchMovie(event: FormEvent<HTMLFormElement>){
      event.preventDefault();
      
      if(query !== ''){
         
         getMovies(`/search/movie?query=${query}`);
         setSearch({
            query: query
         })
      }
   }
   function handleToggleFavourite(){
      if(toggleShoppingCart){
         setToggleShoppingCart(false);
         setToggleFavourite(true);
      }else{
         setToggleFavourite(!toggleFavourite);

      }
   }
   function handleToggleShoppingCart(){
      if(toggleFavourite){
         setToggleFavourite(false);
         setToggleShoppingCart(true);
      }else{
         setToggleShoppingCart(!toggleShoppingCart);
      }
   }
   return (
      <>
      <header className={styles.header}>
         <div className={styles.headerWrapper}>
            <span className={styles.logo}>LOGO</span>
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
            <nav className={styles.iconWrapper}>
               <button 
                  title='Filmes favoritos'
                  onClick={() => handleToggleFavourite()}
               >
                  <BsFillHeartFill
                     size={24}
                  />
               </button>
               <button title='Carrinho de compras'
                  onClick={() => handleToggleShoppingCart()}
               >
                  <BsFillCartFill
                     size={24}
                  />
               </button>
            </nav>
         </div>
      </header>
      {toggleFavourite ? <Favourites /> : null}
      {toggleShoppingCart ? <ShoppingCart /> : null}
      
      </>
   )
}

