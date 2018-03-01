import DataSources from 'data-source';
import Modules from 'modules';

const startup = async (app, done, error) => {
  if (app.didStart) {
    console.clear();
    console.log(
      `Application %c'${app.name}'%c is restarting...`,
      'color: #4a90e2; font-weight: bold;',
      'color: black',
    );
    const newDataSource = require('data-source').default;
    for (let newModule of newDataSource) {
      app.replaceModule(newModule);
    }

    const newModules = require('modules').default;
    for (let newModule of newModules) {
      app.replaceModule(newModule);
    }
  } else {
    console.log(
      `Application %c'${app.name}'%c is starting...`,
      'color: #4a90e2; font-weight: bold;',
      'color: black',
    );
    for (let Module of DataSources) {
      app.register(Module);
    }
    for (let Module of Modules) {
      app.register(Module);
    }
    app.on('applicationDidStart', app => {
      console.log('Application did start!');
    });
    app.on('applicationDidRestart', app => {
      console.log('Application did restart!');
    });
  }
  done();
};

export default startup;
