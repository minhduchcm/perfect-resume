import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';

import styles from './LoginForm.scss';

import LinkButton from 'component/LinkButton/LinkButton';
import InputField from 'component/InputField/InputField';

import requiredValidator from 'utils/validator/requiredValidator';
import regexValidator from 'utils/validator/regexValidator';
import validEmailRegex from 'utils/regex/validEmailRegex';

const validate = values => {
  let errors = {};
  errors = requiredValidator(values, errors, 'email', 'Email');
  errors = regexValidator(
    values,
    errors,
    'email',
    'Email',
    validEmailRegex,
    'Invalid email address',
  );
  errors = requiredValidator(values, errors, 'password', 'Password');
  return errors;
};

class SignupForm extends Component {
  render() {
    const { handleSubmit, submitting, error } = this.props;
    return (
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        {error && <p className={styles.errorMsg}>{error}</p>}
        <Field
          name="email"
          component={InputField}
          type="text"
          placeholder="Email"
        />
        <Field
          name="password"
          component={InputField}
          type="password"
          placeholder="Password"
        />
        <LinkButton
          className={styles.btnLogin}
          solid
          color="red"
          as="button"
          type="submit"
          disabled={submitting}
        >
          {submitting ? 'Logging in...' : 'Login'}
        </LinkButton>
      </form>
    );
  }
}

SignupForm.propTypes = {};

export default reduxForm({
  form: 'login',
  validate,
})(SignupForm);
