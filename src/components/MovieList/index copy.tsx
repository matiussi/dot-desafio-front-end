import styles from './styles.module.scss';
import { MovieItem } from '../MovieItem';
import { api } from '../../services/api';
import { useState, useEffect } from 'react';

type Movie = {
   id: number;
   release_date: string;
   title: string;
   vote_average: number;
   genres: [];
   poster_path: string;
}
const API_KEY = '0b3ff2cdec0e0618fbe13963e03a123f';

export function MovieList() {

   const [movieList, setMovieList] = useState<Movie[]>([]);

   //Realizando um requisição para a API e obtendo os filmes mais populares
   useEffect(() => {
      async function getLatestMovies() {
         const { data } = await api.get<any>(
            `discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`
         );
         const results = data.results;
   
         //Filtrando apenas o id pois a demais informações de um filme
         //serão realizadas em outra requisição
         for (let result of results.keys()) {
            let { id } = results[result];
            await getMovieInfo(id);
         }
      }
   
      async function getMovieInfo(movieId: number) {
         const { data } = await api.get<any>(
            `/movie/${movieId}?api_key=${API_KEY}`
         );
   
         //Extraindo os valores da requisição
         const {
            id, 
            release_date, 
            title, vote_average, 
            genres,
            poster_path 
         } = data;
   
         //Setando os valores ao estado
         setMovieList(prevState => [
            ...prevState,
            {
               id,
               release_date,
               title,
               vote_average,
               genres,
               poster_path,
            }
         ]);
      }
      getLatestMovies();
   }, [])
   // function consoleMovies() {
   //    console.log(movieList);
   // }
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
