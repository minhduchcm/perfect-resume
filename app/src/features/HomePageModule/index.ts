import HomePage from './HomePage';
import subModules from './subModules';

const instance = new HomePage({ name: 'homepage' });
instance.registerSubModules(subModules);

export default instance;
