import { createContext, ReactNode, useContext, useState } from "react";
import Movie from '../types/movie';

type ShoppingCartMovie = {
   movie: Movie;
   quantity: number
}
type PropsShoppingCartContext = {
   shoppingCart: ShoppingCartMovie[] | null;
   addMovie: (movie: Movie, quantity: number) => void
   removeMovie: (movie: Movie) => void;
   clearShoppingCart: () => void;
   getNumberOfMovies: () => number;
   getTotalValue: () => number;
}

type ShoppingCartProvider = {
   children: ReactNode;
}

const ShoppingCartContext = createContext({} as PropsShoppingCartContext);

export const ShoppingCartContextProvider = (props: ShoppingCartProvider) => {

   const [shoppingCart, setShoppingCart] = useState<ShoppingCartMovie[] | []>([]);

   function addMovie(newMovie: Movie, quantity: number) {
      const checkDuplicate = shoppingCart.filter(movie => {
         return movie.movie.id == newMovie.id
      });
      if (checkDuplicate.length > 0) {

         /* Para que a quantidade de filmes seja atualizada corretamente,
            primeiro será criado um vetor auxiliar que receberá uma cópia 
            do estado shoppingCart, em seguida o item será buscado e tera sua quantidade atualizada,
            por último o estado shoppingCart receberá o vetor auxiliar
         */
         const auxShoppingCart = [...shoppingCart];

         const movieId = shoppingCart.findIndex((cartItem => cartItem.movie.id == newMovie.id));

         auxShoppingCart[movieId].quantity++;

         setShoppingCart(auxShoppingCart);

         return;
        
      }
      setShoppingCart(
         prevCartMovie => [
            ...prevCartMovie, {
               movie: newMovie,
               quantity: quantity
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

   function getNumberOfMovies(){
      let numberOfMovies = 0;
      shoppingCart.map(cartItem =>{
         const {quantity} = cartItem;
         numberOfMovies+= quantity;
      });
      return numberOfMovies;
   }
   function getTotalValue() {

      let total = 0;
      shoppingCart.map(cartItem => {
         const {movie, quantity} = cartItem;
         total+= movie.price * quantity
      });
      
      return total;
   }

return (
   <ShoppingCartContext.Provider
      value={{
         shoppingCart,
         addMovie,
         removeMovie,
         clearShoppingCart,
         getNumberOfMovies,
         getTotalValue
      }}
   >
      {props.children}
   </ShoppingCartContext.Provider>
)
}

export const useShoppingCart = () => useContext(ShoppingCartContext);
