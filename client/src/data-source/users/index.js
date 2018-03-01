import AppModule from 'core/AppModule';

import userReducer from './userReducer';
import { loginWithJWT } from './userActions';

const Users = new AppModule({
  name: 'users',
  reducer: userReducer,
  onReady: app => {
    const cookie = app.cookie;
    const token = cookie.get('accessToken');
    if (token) app.store.dispatch(loginWithJWT(token));
  },
});

export default Users;
