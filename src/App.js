import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AmazonPage, ShopifyPage, SquarePage } from './pages';

function App() {
  return (
    <Router>
      <div>
        <h2>Ecommerce</h2>
        <Switch>
          <Route exact path="/shopify" component={ShopifyPage} />
          <Route path="/square" component={SquarePage} />
          <Route path="/amazon" component={AmazonPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
