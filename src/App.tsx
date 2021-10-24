import './App.module.scss';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SearchContextProvider } from './context/search';
import { FavouriteContextProvider } from './context/favourite';
import { ShoppingCartContextProvider } from './context/shoppingCart';


function App() {

  return (
    <Router>
      <SearchContextProvider>
        <ShoppingCartContextProvider>
          <FavouriteContextProvider>
            <Header />
            <Switch>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </FavouriteContextProvider>
        </ShoppingCartContextProvider>
      </SearchContextProvider>
    </Router>
  )
}

export default App;
