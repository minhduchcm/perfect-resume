import React from 'react';
import { Route } from 'react-router-dom';

import SignUpPage from 'modules/sign-up-page/components/SignUpPage/SignUpPage';

const SignUpRoute = (store, parent = null, children = null) => {
  return (
    <Route
      path="/sign-up"
      render={props => {
        return <SignUpPage {...props} children={children} />;
      }}
    />
  );
};

export default SignUpRoute;
