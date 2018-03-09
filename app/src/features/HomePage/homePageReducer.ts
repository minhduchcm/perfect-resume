import { Reducer } from 'redux';
import { Record } from 'immutable';

export type HomePageState = {
  name: string;
};

const defaultValue: HomePageState = { name: 'init' };
const createState = Record(defaultValue);

const reducer: Reducer<Record<HomePageState>> = (
  state = createState(),
  action,
) => {
  return state;
};

export default reducer;
