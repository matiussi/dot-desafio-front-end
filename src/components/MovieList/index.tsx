import styles from './styles.module.scss';
import { MovieItem } from '../MovieItem';

export function MovieList(){
   return (
      <ul className={styles.movieList}>
         <MovieItem />
      </ul>
   )
}