import styles from './styles.module.scss';
import { BsSearch, BsFillHeartFill, BsFillCartFill } from 'react-icons/bs';
import { useRef, useState, useEffect, FormEvent, useContext } from 'react';
import { getMovies } from '../../helpers/api';
import {useSearch} from '../../context/search';

export function Header() {

   //Estado que armazena o valor digitado pelo usuário
   const [query, setQuery] = useState('');
   //Estado que armazena o nome do filme a ser buscado, seu valor é criado após o submit do formulário
   const [searchMovie, setSearchMovie] = useState('');

   const {search, setSearch} = useSearch();

   async function handleSearchMovie(event: FormEvent<HTMLFormElement>){
      event.preventDefault();
      
      if(query !== ''){
         
         getMovies(`/search/movie?query=${query}`);
         setSearch({
            query: query
         })
      }
   }

   return (
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
               <button title='Filmes favoritos'>
                  <BsFillHeartFill
                     size={24}
                  />
               </button>
               <button title='Carrinho de compras'>
                  <BsFillCartFill
                     size={24}
                  />
               </button>
            </nav>
         </div>
      </header>
   )
}

