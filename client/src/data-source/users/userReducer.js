import { Map, fromJS } from 'immutable';
import { SET_CURRENT_USER } from './userActions';

const initState = new Map({
  all: new Map(),
  currentUser: null,
});

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER: {
      const user = action.user;
      return state
        .set('currentUser', user.id)
        .setIn(['all', user.id.toString()], fromJS(user));
    }
    default:
      return state;
  }
};

export default userReducer;
