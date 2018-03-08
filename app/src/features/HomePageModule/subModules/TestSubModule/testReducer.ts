import { Reducer } from 'redux';
import { Record } from 'immutable';

export type TestState = {
  name: string;
};

const defaultValue: TestState = { name: 'test' };
const createState = Record(defaultValue);

const reducer: Reducer<Record<TestState>> = (state = createState(), action) => {
  return state;
};

export default reducer;
