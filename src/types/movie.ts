type Movie = {
   id: number;
   release_date: string;
   title: string;
   vote_average: number;
   genre: {
      id: number;
      name: string;
   } | null;
   poster_path: string;
   price: number;
}

export default Movie;