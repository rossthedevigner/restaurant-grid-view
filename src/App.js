import React, {useEffect} from 'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {useAppContext} from './context/AppProvider';
import {RestaurantList} from './components/RestaurantList';

const App = () => {
  const context = useAppContext();

  useEffect(() => {
    if (!context.restaurants.length) {
      context.getData();
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route
          path={['/', '/:restaurant']}
          exact
          render={props => <RestaurantList {...props} />}
        />
      </Switch>
    </Router>
  );
};

export {App};
