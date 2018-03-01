import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import SubmissionError from 'redux-form/lib/SubmissionError';

import styles from './LoginPage.scss';

import Fa from 'component/Fa/Fa';
import { connect } from 'react-redux';
import { loginAction } from 'modules/login-page/loginActions';

import LoginForm from '../LoginForm/LoginForm';

class LoginPage extends PureComponent {
  state = {};

  onSubmit = async user => {
    return this.props.actions.login(user).catch(errors => {
      throw new SubmissionError(errors);
    });
  };

  render() {
    return (
      <div className={styles.loginPage}>
        <Link className={styles.backToHome} to="/">
          <Fa icon="faAngleLeft" /> Back to home
        </Link>
        <h1>Login with email</h1>
        <LoginForm onSubmit={this.onSubmit} />
        <p className={styles.ctaLink}>
          Dont' have an account? <Link to="sign-up">Sign up</Link>
        </p>
        <p>By using PerfectResume, you are agreeing to our Terms of Service</p>
      </div>
    );
  }
}

LoginPage.propTypes = {};

const mapStateToProps = (state, props) => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    actions: {
      login: user => dispatch(loginAction(user)),
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
