import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import SubmissionError from 'redux-form/lib/SubmissionError';

import styles from './SignUpPage.scss';

import SignupForm from 'modules/signup-page/components/SignupForm/SignupForm';
import Fa from 'component/Fa/Fa';
import { connect } from 'react-redux';
import { signupUserAction } from 'modules/signup-page/signupActions';

class SignUpPage extends PureComponent {
  onSubmit = async user => {
    return this.props.actions.signupUser(user).catch(errors => {
      throw new SubmissionError(errors);
    });
  };

  render() {
    return (
      <div className={styles.signupPage}>
        <Link className={styles.backToHome} to="/">
          <Fa icon="faAngleLeft" /> Back to home
        </Link>
        <h1>Create your account</h1>
        <SignupForm onSubmit={this.onSubmit} />
        <p className={styles.ctaLink}>
          Have an account? <Link to="login">Login</Link>
        </p>
        <p>By using PerfectResume, you are agreeing to our Terms of Service</p>
      </div>
    );
  }
}

SignUpPage.propTypes = {};

const mapStateToProps = (state, props) => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    actions: {
      signupUser: user => dispatch(signupUserAction(user)),
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
