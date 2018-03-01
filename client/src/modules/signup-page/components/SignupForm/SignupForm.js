import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';

import styles from './SignupForm.scss';

import LinkButton from 'component/LinkButton/LinkButton';
import InputField from 'component/InputField/InputField';

import requiredValidator from 'utils/validator/requiredValidator';
import lengthValidator from 'utils/validator/lengthValidator';
import regexValidator from 'utils/validator/regexValidator';
import validEmailRegex from 'utils/regex/validEmailRegex';
import equalValidator from 'utils/validator/equalValidator';

const validate = values => {
  let errors = {};

  errors = requiredValidator(values, errors, 'fullname', 'Full name');
  errors = lengthValidator(values, errors, 'fullname', 'Full name', 8, 50);

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
  errors = lengthValidator(values, errors, 'password', 'Password', 8, 50);

  errors = requiredValidator(
    values,
    errors,
    'confirmPassword',
    'Confirm password',
  );
  errors = equalValidator(
    values,
    errors,
    'confirmPassword',
    'Confirm password',
    values.password,
    'Confirm password must be the same as password',
  );
  return errors;
};

class SignupForm extends Component {
  render() {
    const { handleSubmit, submitting, error } = this.props;
    return (
      <form onSubmit={handleSubmit} className={styles.signupForm}>
        {error && <p className={styles.errorMsg}>{error}</p>}
        <Field
          name="fullname"
          component={InputField}
          type="text"
          placeholder="Full name"
        />
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
        <Field
          name="confirmPassword"
          component={InputField}
          type="password"
          placeholder="Confirm password"
        />
        <LinkButton
          className={styles.btnSignup}
          solid
          color="red"
          as="button"
          type="submit"
          disabled={submitting}
        >
          {submitting ? 'Signing up...' : 'Sign Up'}
        </LinkButton>
      </form>
    );
  }
}

SignupForm.propTypes = {};

export default reduxForm({
  form: 'signup',
  validate,
})(SignupForm);
