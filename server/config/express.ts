import * as dotenv from 'dotenv';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as db from './db';
import * as expressValidator from 'express-validator';

import auth from '../controllers/auth';
import isEmailAvailable from '../validator/isEmailAvailable';

dotenv.config();
db.connect();
const corsWhitelist = ['http://localhost:4000', 'http://localhost:3000'];
var corsOptions = {
  origin: function(origin, callback) {
    if (origin === undefined || corsWhitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

export default () => {
  let app = express();
  app.use(cors(corsOptions));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(
    expressValidator({
      customValidators: {
        isEmailAvailable: isEmailAvailable
      }
    })
  );
  app.use(auth.initialize());

  app.all(process.env.API_BASE + '*', (req, res, next) => {
    if (req.path.includes(process.env.API_BASE + 'login')) return next();
    if (req.path.includes(process.env.API_BASE + 'register')) return next();

    return auth.authenticate((err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        if (info.name === 'TokenExpiredError') {
          return res.status(401).json({
            message: 'Your token has expired. Please generate a new one'
          });
        }
      } else {
        app.set('user', user);
      }
      return next();
    })(req, res, next);
  });

  const routes = require('../routes')(app);
  return app;
};
