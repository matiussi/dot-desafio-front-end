type Movie = {
   id: number;
   release_date: string;
   title: string;
   vote_average: number;
   genres: [{
      id: number;
      name: string;
   }];
   poster_path: string;
}

export default Movie;