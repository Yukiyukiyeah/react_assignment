
import MainPage from './mainpage';
import { 
  HashRouter as Router, 
  Route, 
  Switch
} from "react-router-dom";

const App: React.FC = () =>  {
  return (
    <Router basename = "">
      <Switch>
        <Route exact path = "/" component = { MainPage }/>
      </Switch>
    </Router>
    
  );
}

export default App;
