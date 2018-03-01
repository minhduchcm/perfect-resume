import React from 'react';
import { Route } from 'react-router-dom';

import Dashboard from './components/Dashboard/Dashboard';

const DashboardRoute = (store, parent = null, children = null) => {
  return (
    <Route
      path="/app"
      render={props => {
        return <Dashboard {...props} children={children} />;
      }}
    />
  );
};

export default DashboardRoute;
