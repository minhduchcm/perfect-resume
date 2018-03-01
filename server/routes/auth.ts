import Auth from '../controllers/auth';

export = app => {
  /**
   * @api {post} /api/v1/login Generate a token
   * @apiVersion 1.0.0
   * @apiName Login
   * @apiGroup Auth
   * @apiPermission public
   * @apiDescription In order to generate a token, you will need to already have a user in the database.
   *
   * @apiParam (Request body) {String} email The email
   * @apiParam (Request body) {String} password The password
   *
   * @apiExample {js} Example usage:
   * const data = {
   *   "email": "test@email.com",
   *   "password": "yourpassword"
   * };
   *
   * @apiSuccess {String} token The token that must be used to access the other endpoints
   * @apiSuccess {String} expires The expiration datetime (YYYY-MM-DDTHH:mm:ssZ)
   *
   * @apiSuccessExample {json} Success response:
   *     HTTPS 200 OK
   *     {
   *      "token": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9 ... and the rest of the token here",
   *      "expires": "2017-10-28T14:50:17+00:00",
   *     }
   */
  app.post(process.env.API_BASE + 'login', Auth.login);

  /**
   * @api {post} /api/v1/register Register a new user
   * @apiVersion 1.0.0
   * @apiName Register
   * @apiGroup Auth
   * @apiPermission public
   * @apiDescription Register a new user.
   *
   * @apiParam (Request body) {String} fullname The full name
   * @apiParam (Request body) {String} email The email
   * @apiParam (Request body) {String} password The password
   * @apiParam (Request body) {String} confirmPassword The confirm password
   *
   * @apiExample {js} Example usage:
   * const data = {
   *   "fullname": "test user",
   *   "email": "test@email.com",
   *   "password": "yourpassword"
   *   "confirmPassword": "yourpassword"
   * };
   *
   * @apiSuccessExample {json} Success response:
   *     HTTPS 200 OK
   */
  app.post(process.env.API_BASE + 'register', Auth.register);
};
