import styles from './styles.module.scss';
import { MovieItem } from '../MovieItem';
import { api } from '../../services/api';
import { useState, useEffect } from 'react';
import { getMovies } from '../../helpers/api';
import { useSearch } from '../../context/search';

type Movie = {
   id: number;
   release_date: string;
   title: string;
   vote_average: number;
   genres: [];
   poster_path: string;
}

export function MovieList() {

   const [movieList, setMovieList] = useState<Movie[]>([]);

   const {search} = useSearch();

   useEffect(() => {
      /* Realizando um requisição para a API e obtendo os filmes mais populares
         no primeiro carregamento */
      const movieListApi = getMovies(`discover/movie?sort_by=popularity.desc`);
      movieListApi.then(movies => {
         setMovieList(movies)
      });
   },[]);

   useEffect(() => {
      if(search.query == ""){
         return;
      }
      const movieListApi = getMovies(`/search/movie?query=${search.query}`);
      movieListApi.then(movies => {
         setMovieList(movies)
      });
   }, [search]);

   return (
      <ul className={styles.movieList}>
         {/* <button onClick={() => getLatestMovies()}>Button</button> */}
         {/* <button onClick={() => consoleMovies()}>COnsole movies</button> */}
         { movieList.map((movie) => {
            return ( 
               <MovieItem
                  key={movie.id} 
                  id={movie.id}
                  release_date={movie.release_date}
                  title={movie.title}
                  vote_average={movie.vote_average}
                  genres={movie.genres}
                  poster_path={movie.poster_path}
               />
               );
            }
         )}
      </ul>
   )
}
function getLatestMovies(arg0: string) {
   throw new Error('Function not implemented.');
}

