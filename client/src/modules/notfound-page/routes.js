import React from 'react';
import { Route } from 'react-router-dom';
import NotFoundPage from 'modules/notfound-page/NotFoundPage';

const NotFoundRoute = (store, parent = null, children = null) => {
  return (
    <Route
      path="*"
      render={props => {
        return <NotFoundPage {...props} children={children} />;
      }}
    />
  );
};

export default NotFoundRoute;
