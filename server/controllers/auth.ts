import * as jwt from 'jwt-simple';
import * as passport from 'passport';
import * as moment from 'moment';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { model as User, IUser } from '../models/user';
import { isArray } from 'util';

class Auth {
  public initialize = () => {
    passport.use('jwt', this.getStrategy());
    return passport.initialize();
  };
  public authenticate = callback =>
    passport.authenticate(
      'jwt',
      { session: false, failWithError: true },
      callback
    );

  private genToken = (user: IUser): Object => {
    let expires = moment()
      .utc()
      .add({ days: 30 })
      .unix();
    let token = jwt.encode(
      {
        exp: expires,
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        roles: []
      },
      process.env.JWT_SECRET
    );

    return {
      token: 'JWT ' + token,
      expires: moment.unix(expires).format()
    };
  };
  private getStrategy = (): Strategy => {
    const params = {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
      passReqToCallback: true
    };

    return new Strategy(params, (req, payload: any, done) => {
      User.findOne({ email: payload.email }, (err, user) => {
        /* istanbul ignore next: passport response */
        if (err) {
          return done(err);
        }
        /* istanbul ignore next: passport response */
        if (user === null) {
          return done(null, false, {
            message: 'The user in the token was not found'
          });
        }

        return done(null, { _id: user._id, email: user.email });
      });
    });
  };

  public login = async (req, res) => {
    try {
      req.checkBody('email', 'Email is required.').notEmpty();
      req.checkBody('password', 'Password is required.').notEmpty();

      let errors = await req.asyncValidationErrors();
      if (errors) throw errors;

      let user = await User.findOne({ email: req.body.email }).exec();

      if (user === null) throw { email: 'Email not found.' };

      const { password } = req.body;

      let success = await user.comparePassword(req.body.password);
      if (success === false) throw new Error('Invalid credentials');

      res.status(200).json(this.genToken(user));
    } catch (errors) {
      if (isArray(errors)) res.status(401).json({ errors });
      res
        .status(401)
        .json({ errors: [{ param: '_error', msg: errors.message }] });
    }
  };

  public register = async (req, res) => {
    try {
      req
        .checkBody('fullname')
        .notEmpty()
        .withMessage('Full name is required.');
      req
        .checkBody('email')
        .notEmpty()
        .withMessage('Email is required.')
        .isEmail()
        .withMessage('Invalid email address')
        .isEmailAvailable()
        .withMessage('This email is already in use');
      req
        .checkBody('password')
        .notEmpty()
        .withMessage('Password is required.');
      req
        .checkBody('confirmPassword')
        .notEmpty()
        .withMessage('Confirm password is required.')
        .custom(confirmPassword => confirmPassword === req.body.password)
        .withMessage('Confirm password must be the same as password.');

      let errors = await req.asyncValidationErrors();
      if (errors) throw errors;

      const { fullname, email, password, confirmPassword } = req.body;

      const user = new User({
        fullname,
        email,
        password
      });
      await user.save();
      res.status(200).end();
    } catch (errors) {
      if (isArray(errors)) res.status(400).json({ errors });
      res
        .status(400)
        .json({ errors: [{ param: '_error', msg: errors.message }] });
    }
  };
}

export default new Auth();
