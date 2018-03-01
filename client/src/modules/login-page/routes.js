import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from 'modules/login-page/components/LoginPage/LoginPage';

const LoginRoute = (store, parent = null, children = null) => {
  return (
    <Route
      path="/login"
      render={props => {
        return <LoginPage {...props} children={children} />;
      }}
    />
  );
};

export default LoginRoute;
