import jwtDecode from 'jwt-decode';

export const SET_CURRENT_USER = '@@users/SET_CURRENT_USER';

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user,
});

export const loginWithJWT = jwt => {
  return dispatch => {
    const { exp, ...decodedUser } = jwtDecode(jwt);
    dispatch(setCurrentUser(decodedUser));
  };
};
