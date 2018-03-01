import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from 'modules/home-page/HomePage';

const HomePageRoute = (store, parent = null, children = null) => {
  return (
    <Route
      path="/"
      exact
      render={props => {
        return <HomePage {...props} children={children} />;
      }}
    />
  );
};

export default HomePageRoute;
