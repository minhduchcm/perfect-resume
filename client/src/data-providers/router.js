import { createSelector } from 'reselect';
import qs from 'qs';

const getQueryString = state => state.get('router').location.search;

export const getQuery = createSelector([getQueryString], queryString => {
  return qs.parse(queryString, {
    ignoreQueryPrefix: true,
  });
});
