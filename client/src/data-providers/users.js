import { createSelector } from 'reselect';

const getCurrentUserId = state => state.getIn(['users', 'currentUser']);
const getUsers = state => state.getIn(['users', 'all']);

export const getCurrentUser = createSelector(
  [getCurrentUserId, getUsers],
  (id, users) => {
    const user = users.get(id);
    return (user && user.toJS()) || null;
  },
);
