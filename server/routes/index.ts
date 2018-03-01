import * as path from 'path';
import * as express from 'express';

export = app => {
  require('./auth')(app);

  app.use(express.static(path.resolve(__dirname, '../../../docs/apidoc')));

  app.use((req, res, next) => {
    res.status(404).json({ error: 'Endpoint not found' });
    next();
  });

  app.use((error, req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
      return res.status(500).json({ error: 'Unexpected error: ' + error });
    }
    next(error);
  });
};
