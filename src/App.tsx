import './App.module.scss';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SearchContextProvider } from './context/search';


function App() {

  return (
    <Router>
      <SearchContextProvider>
        <Header />
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </SearchContextProvider>
    </Router>
  )
}

export default App;
