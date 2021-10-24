import { api } from '../services/api';
import Movie from '../types/movie';

const API_KEY = '0b3ff2cdec0e0618fbe13963e03a123f';

/**
 * Função responsável por obter uma lista de filmes de acordo com um query
 */
export async function getMovies(query : string) {
   const { data } = await api.get<any>(query+`&api_key=${API_KEY}`);
   const fetchedMovies = data.results;

   /** 
    *  Filtrando apenas o id pois a demais informações de um filme
    *  serão realizadas em outra requisição
   */
  
   let movieList : Movie[] = [];
   for (let movie of fetchedMovies.keys()) {
      let { id } = fetchedMovies[movie];
      const movieInfo = await getMovieInfo(id);
      movieList.push(movieInfo);
   }
   return movieList;
}

/**
 * Função responsável por realizar uma requisição de acordo com o id do fillme
 * e obter apenas as informações necessárias
 */
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
   } : Movie = data;

   const movie: Movie = {
      id, 
      release_date, 
      title, vote_average, 
      genres,
      poster_path 
   }

   return movie;

}