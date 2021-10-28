import { createContext, ReactNode, useContext, useState } from "react";
import Movie from '../types/movie';


type PropsFavouritesContext = {
   favourite: Movie[] | null;
   addFavourite: (movie: Movie) => void
   removeFavourite: (movie: Movie) => void;
   clearFavourites: () => void;
   addToShoppingCart: (movie: Movie) => void;
   favouriteActive: boolean,
   handleFavouriteActive: (value: boolean) => void;
}

type FavouritesProvider = {
   children: ReactNode;
}

const FavouriteContext = createContext({} as PropsFavouritesContext);

export const FavouriteContextProvider = (props: FavouritesProvider ) =>{

   const [favourite, setFavourite] = useState<Movie[] | []>([]);
   const [favouriteActive, setFavouriteActive] = useState(false);

   function handleFavouriteActive(value: boolean){
      setFavouriteActive(value);
   }

   function addFavourite(newMovie: Movie){
      const checkDuplicate = favourite.filter(movie => {
         return movie.id == newMovie.id;
      });
      if(checkDuplicate.length > 0){
         return;
      }
      setFavourite(
         prevFavourite => [...prevFavourite, newMovie]
      );
   }
   function removeFavourite(movieRemove: Movie){

      setFavourite(favourite.filter(movie => movie.id !== movieRemove.id));

   }
   function clearFavourites(){
      setFavourite([]);
   }
   function addToShoppingCart(){

   }

   return (
      <FavouriteContext.Provider
         value={{
            favourite,
            addFavourite,
            removeFavourite,
            clearFavourites,
            addToShoppingCart,
            favouriteActive,
            handleFavouriteActive
         }}
      >
         {props.children}
      </FavouriteContext.Provider>
   )
}

export const useFavourite = () => useContext(FavouriteContext);
