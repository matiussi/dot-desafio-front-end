import styles from './styles.module.scss';
import { FaSpinner } from 'react-icons/fa';
import { MovieItem } from '../MovieItem';
import { useState, useEffect } from 'react';
import { getMovies } from '../../helpers/api';
import { useSearch } from '../../context/search';
import Movie from '../../types/movie';



export function MovieList() {

   const [movieList, setMovieList] = useState<Movie[]>([]);

   const [loading, setLoading] = useState<boolean>(false);

   const { search } = useSearch();

   useEffect(() => {
      /* Realizando uma requisição para a API e obtendo os filmes mais populares
         no primeiro carregamento */
      async function fetchData() {
         setLoading(true);
         const fetchedMovies = await getMovies(`discover/movie?sort_by=popularity.desc`);
         setMovieList(fetchedMovies);
         setLoading(false);
      }
      fetchData()
   }, []);

   useEffect(() => {
      if (search.query == "") {
         return;
      }
      async function fetchData() {
         setLoading(true);
         const fetchedMovies = await getMovies(`/search/movie?query=${search.query}`);
         setMovieList(fetchedMovies);
         setLoading(false);
      }
      fetchData()
   }, [search]);

   return (
      <ul className={styles.movieList}>
         {
            !loading ?
               movieList.map((movie) => {
                  return (
                     <MovieItem
                        key={movie.id}
                        id={movie.id}
                        release_date={movie.release_date}
                        title={movie.title}
                        vote_average={movie.vote_average}
                        genres={movie.genres}
                        poster_path={movie.poster_path}
                        price={movie.price}
                     />
                  );
               }
               )
               :
               <div className={styles.loading}>
                  <FaSpinner size={32} />
               </div>
         }
      </ul>
   )
}


