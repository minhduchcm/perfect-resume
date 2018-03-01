import { signupUser } from 'modules/signup-page/signupApi';
import { replace } from 'react-router-redux';

export const signupUserAction = user => {
  return async dispatch => {
    await signupUser(user);
    await dispatch(replace('/login'));
  };
};
