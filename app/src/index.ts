import 'normalize.css';
import { createBrowserHistory } from 'history';

import registerServiceWorker from 'registerServiceWorker';
import config from 'config';

import Application from 'core/Application';
import ConfiguredStore from 'core/ConfiguredStore';

import features from 'features';

const instance = new Application({
  name: config.name,
  dom: config.dom.root,
})
  .init(async (app: Application) => {
    console.debug('application init!');
    app.registerModules(features);
    app.history = createBrowserHistory();
    const configuredStore = new ConfiguredStore({
      reducers: await app.getReducers(),
      history: app.history,
    });
    app.store = configuredStore.getReduxStore();
  })
  .ready((app: Application) => {
    console.debug('application ready!');
  });

instance.start();

registerServiceWorker();

// if (module.hot !== undefined) {
//   module.hot.accept('core/Application', () => {
//     if (module.hot === undefined) {
//       return;
//     }
//     console.debug('aasdasdasd');
//   });
// }
