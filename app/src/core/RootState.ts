import { FormStateMap } from 'redux-form';
import { RouterState } from 'react-router-redux';

interface RootState {
  form: FormStateMap;
  router: RouterState;
}

export default RootState;
