import { login } from 'modules/login-page/loginApi';
import { loginWithJWT } from 'data-source/users/userActions';
import { getQuery } from 'data-providers/router';
import { replace } from 'react-router-redux';

export const loginAction = user => {
  return async (dispatch, getState, { cookie }) => {
    const res = await login(user);

    cookie.set('accessToken', res.token, {
      expires: new Date(res.expires),
    });

    dispatch(loginWithJWT(res.token));

    const currentState = getState();
    const { redirect } = getQuery(currentState);
    if (redirect) {
      dispatch(replace(redirect));
    } else {
      dispatch(replace('/'));
    }
  };
};
