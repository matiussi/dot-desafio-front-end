import axios from 'axios'

//Rota padrão
export const api = axios.create({
   baseURL: 'https://api.themoviedb.org/3'
});

//Rota para obter o poster do filme
export const posterPath = axios.create({
   baseURL: 'https://image.tmdb.org/t/p/original'
})