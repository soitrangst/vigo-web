import * as React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import Home from "./view/screens/Home";
import Detail from "./view/screens/Detail"
import { Url } from './service/infastructural/constant';
import Empty from './view/screens/Empty';
import Admin from './view/screens/Admin';



const Router: React.FC = () => {

  return (
    <BrowserRouter>
      <Switch>

        <Route exact path="/" >
          <Admin/>
        {/* <Home /> */}
        </Route>

        <Route path={Url.receive}>
          <Detail />
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