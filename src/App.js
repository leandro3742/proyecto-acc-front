import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './views/Home';
import Prueba from './views/Prueba';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/prueba" exact component={Prueba} />
          </Switch>
        </Layout>        
      </BrowserRouter>
    </div>
  );
}

export default App;
