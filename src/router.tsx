import * as React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import { Url } from './service/infastructural/constant';
import Detail from './view/Detail';
import Empty from './view/Empty';
import Home from './view/Home';



const Router: React.FC = () => {

  return (
    <BrowserRouter>
      <Switch>

        <Route exact path="/" >
          <Home/>
        </Route>

        <Route path={Url.receive}>
          <Detail/>
        </Route>

        <Route path="/401">
          <h1>bad server</h1>
        </Route>

        <Route path="/404" >
          <Empty/>
        </Route>

        <Route path="**" >
          <Redirect to="/404" />
        </Route>

      </Switch>

    </BrowserRouter>
  );
}

export default Router