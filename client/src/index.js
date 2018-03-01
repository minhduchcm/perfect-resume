import Cookie from 'universal-cookie';

import Application from 'core/Application';
import startup from 'bootstrap/startup';
import ready from 'bootstrap/ready';
import config from 'config';
import registerServiceWorker from 'registerServiceWorker';
import 'normalize.css';
import './styles/global.scss';

const myApp = new Application(config.name, new Cookie());
const root = config.dom.root;

myApp
  .init(startup)
  .ready(ready)
  .start(root);

if (module.hot) {
  module.hot.accept('bootstrap/startup', m => {
    myApp.init(startup).reStart(root);
  });
}

registerServiceWorker();
