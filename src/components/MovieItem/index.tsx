import styles from './styles.module.scss';
import mockImage from '../../assets/mock.jpg';
import { BsFillHeartFill, BsStarFill } from 'react-icons/bs';

type MovieProps={
   id: number;
   release_date: string;
   title: string;
   vote_average: number;
   genres: [];
   poster_path: string;
}


export function MovieItem( props: MovieProps) {

   return (
      <>
         <li className={styles.movieItem} >
            <div className={styles.movieItemTop}>
               <div
                  className={styles.movieCover}
                  style={{
                     backgroundImage: `
                        url("https://image.tmdb.org/t/p/original${props.poster_path}")
                     `
                  }}>
                  {/* <img src={mockImage}></img> */}
                  <BsFillHeartFill 
                     size={30} 
                     className={styles.favourite} 
                     title="Adicionar aos favoritos"
                     
                  />
                  <p className={styles.movieRelease}>
                     {props.release_date}
                  </p>
               </div>
            </div>
            <div className={styles.movieBottom}>
               <div
                  className={styles.movieTitle}
               >
                  <strong>
                     {props.title }
                  </strong>
               </div>
               <div className={styles.movieInfo}>
                  <div className={styles.movieDetails}>
                     <span className={styles.rating}>
                        <BsStarFill />
                        {props.vote_average}
                     </span>
                     <details>
                        <summary>Gênero</summary>
                        {props.genres.map(genre => {
                           return <summary>{genre['name']}</summary>
                        })}
                     </details>
                  </div>
                  <div className={styles.price}>
                     R$ 79,99
                  </div>
               </div>
            </div>
               <button
                  className={styles.button}
               >
                  Adicionar
               </button>
         </li>
      </>
   )
}