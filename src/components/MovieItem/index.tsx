import styles from './styles.module.scss';
import button from '../../styles/button.module.scss';
import { BsFillHeartFill, BsStarFill } from 'react-icons/bs';
import imageNotFound from '../../assets/notfound.png';

import Movie from '../../types/movie';

import {useFavourite} from '../../context/favourite';
import { useShoppingCart } from '../../context/shoppingCart';



export function MovieItem( movie: Movie) {

   const { addFavourite } = useFavourite();
   const { addMovie } = useShoppingCart();

   return (
      <>
         <li className={styles.movieItem} >
            <div className={styles.movieItemTop}>
               <div
                  className={styles.movieCover}
                  style={movie.poster_path ?
                     {
                        backgroundImage: `
                           url("https://image.tmdb.org/t/p/original${movie.poster_path}")
                        `
                     }
                     :
                     {backgroundImage: `url(${imageNotFound})`}
                  }>
                  {/* <img src={mockImage}></img> */}
                  <button
                     className={styles.favourite} 
                     title="Adicionar aos favoritos"
                     onClick={() => addFavourite(movie)}
                  >
                     <BsFillHeartFill 
                        size={30} 
                     />
                  </button>
                  <p className={styles.movieRelease}>
                     {movie.release_date}
                  </p>
               </div>
            </div>
            <div className={styles.movieBottom}>
               <div
                  className={styles.movieTitle}
               >
                  <strong>
                     {movie.title }
                  </strong>
               </div>
               <div className={styles.movieInfo}>
                  <div className={styles.movieDetails}>
                     <span className={styles.rating}>
                        <BsStarFill />
                        <span>
                           {movie.vote_average}
                        </span>
                     </span>
                     <span>
                        {movie.genres[0] ? movie.genres[0].name : 'Gênero'}
                     </span>
                  </div>
                  <div className={styles.price}>
                     R$ {movie.price.toFixed(2).replace('.', ',')}
                  </div>
               </div>
            </div>
               <button
                  className={button.button}
                  onClick={() => addMovie(movie, 1)}
               >
                  Adicionar
               </button>
         </li>
      </>
   )
}