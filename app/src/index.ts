import 'normalize.css';

import registerServiceWorker from 'registerServiceWorker';
import config from 'config';

import Application from 'core/Application';
import features from 'features';

const instance = new Application({
  name: config.name,
  dom: config.dom.root,
})
  .init((app: Application) => {
    console.debug('application init!');
    app.registerModules(features);
  })
  .ready((app: Application) => {
    console.debug('application ready!');
  });

instance.start();

registerServiceWorker();

if (module.hot !== undefined) {
  module.hot.accept('core/Application', () => {
    if (module.hot === undefined) {
      return;
    }
    console.debug('aasdasdasd');
  });
}
