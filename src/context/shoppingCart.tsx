import { createContext, ReactNode, useContext, useState } from "react";
import Movie from '../types/movie';

type ShoppingCartMovie = {
   movie: Movie;
   quantity: number
}
type PropsShoppingCartContext = {
   shoppingCart: ShoppingCartMovie[] | null;
   addMovie: (movie: Movie) => void
   removeMovie: (movie: Movie) => void;
   clearShoppingCart: () => void;
   getTotalValue: () => void;
}

type ShoppingCartProvider = {
   children: ReactNode;
}

const ShoppingCartContext = createContext({} as PropsShoppingCartContext);

export const ShoppingCartContextProvider = (props: ShoppingCartProvider) => {

   const [shoppingCart, setShoppingCart] = useState<ShoppingCartMovie[] | []>([]);
   let quantity;

   function addMovie(newMovie: Movie) {
      const checkDuplicate = shoppingCart.filter(movie => {
         return movie.movie.id == newMovie.id
      });
      if (checkDuplicate.length > 0) {
         return;
      }
      setShoppingCart(
         prevCartMovie => [
            ...prevCartMovie, {
               movie: newMovie,
               quantity: 1
            }
         ]
      );
   
   }
   function removeMovie(movieRemove: Movie) {

      setShoppingCart(shoppingCart.filter(movie => movie.movie.id !== movieRemove.id));

   }
   function clearShoppingCart() {
      setShoppingCart([]);
   }

   function getTotalValue() {

   }

return (
   <ShoppingCartContext.Provider
      value={{
         shoppingCart,
         addMovie,
         removeMovie,
         clearShoppingCart,
         getTotalValue
      }}
   >
      {props.children}
   </ShoppingCartContext.Provider>
)
}

export const useShoppingCart = () => useContext(ShoppingCartContext);
