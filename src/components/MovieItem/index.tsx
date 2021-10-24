import styles from './styles.module.scss';
import mockImage from '../../assets/mock.jpg';
import { BsFillHeartFill, BsStarFill } from 'react-icons/bs';
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
                  style={{
                     backgroundImage: `
                        url("https://image.tmdb.org/t/p/original${movie.poster_path}")
                     `
                  }}>
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
                        <span 
                           aria-details='Nota média do filme'
                        >
                           {movie.vote_average}
                        </span>
                     </span>
                     <span>
                        {movie.genres[0].name}
                     </span>
                  </div>
                  <div className={styles.price}>
                     R$ 79,99
                  </div>
               </div>
            </div>
               <button
                  className={styles.button}
                  onClick={() => addMovie(movie)}
               >
                  Adicionar
               </button>
         </li>
      </>
   )
}