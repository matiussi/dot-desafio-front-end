import { api } from '../services/api';
import Movie from '../types/movie';

const API_KEY = '0b3ff2cdec0e0618fbe13963e03a123f';

/**
 * Função responsável por obter uma lista de filmes de acordo com uma query
 */
export async function getMovies(query: string) {

   //Obtendo a lista de gêneros
   const { data: genreList } = await api.get<any>(`genre/movie/list?api_key=${API_KEY}&language=pt-BR`);

   //Obtendo uma lista filmes
   const { data } = await api.get<any>(query + `&api_key=${API_KEY}&language=pt-BR`);
   const fetchedMovies = data.results;

   /*
      A requisição acima não retorna os gêneros contendo strings e sim um array,
      com os ids dos gêneros, o tratamento será realizado pela função setMovieInfo()
   */
   let movieList: Movie[] = [];
   for (let movie of fetchedMovies.keys()) {
      const newMovie = await setMovieInfo(fetchedMovies[movie], genreList);
      movieList.push(newMovie);
   }
   return movieList;
}

/**
 * Função responsável por inserir as informações no array de filmes
 */
async function setMovieInfo(movie: Movie, genreList: any) {
   //Extraindo os valores de um filme recebido via requisição
   const {
      id,
      release_date,
      title, 
      vote_average,
      genre_ids,
      poster_path
   }: any = movie;

    /* A API não fornece informação sobre os valores dos filmes 
      então cada filme terá um valor gerado aleatoriamente entre 20 e 200
   */
   const price = parseFloat(((Math.random() * (200 - 20)) + 20).toFixed(2));

   //Extraindo apenas o primeiro gênero do filme a partir da lista de gêneros passada via parâmetro
   const genreName = genreList.genres.filter((genre: any) => genre['id'] === genre_ids[0]);

   const newMovie: Movie = {
      id,
      release_date,
      title, 
      vote_average,
      genre: genreName[0] ? {
         id: genreName[0]?.id,
         name: genreName[0]?.name
      }: null,
      poster_path,
      price
   }

   return newMovie;

}