import React, { createContext, useContext, useState } from "react";

type Search = {
   query: string;
}
type PropsSearchContext = {
   search: Search;
   setSearch: React.Dispatch<React.SetStateAction<Search>>;
}

const DEFAULT_VALUE = {
   search: {
      query: ''
   },
   setSearch: () => { }
}


const SearchContext = createContext<PropsSearchContext>(DEFAULT_VALUE);

export const  SearchContextProvider: React.FC = ({children} ) =>{
   const [search, setSearch] = useState(DEFAULT_VALUE.search);

   return (
      <SearchContext.Provider
         value={{
            search,
            setSearch
         }}
      >
         {children}
      </SearchContext.Provider>
   )
}

export const useSearch = () => useContext(SearchContext)
