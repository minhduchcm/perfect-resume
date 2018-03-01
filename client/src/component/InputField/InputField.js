import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './InputField.scss';

class InputField extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      error: false,
      success: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { meta: { touched, error } } = nextProps;
    if (touched) {
      if (error) {
        return {
          error: true,
          success: false,
        };
      } else {
        return {
          error: false,
          success: true,
        };
      }
    }
    return null;
  }

  render() {
    const { className, type, placeholder, input, meta } = this.props;
    const { success, error } = this.state;
    return (
      <div
        className={cx(styles.inputField, className, {
          [styles.error]: meta.touched && error,
          [styles.success]: meta.touched && success,
        })}
      >
        <input
          disabled={meta.submitting}
          type={type}
          placeholder={placeholder}
          {...input}
        />
        {meta.touched &&
          meta.error && (
            <span className={styles.errorMessage}>{meta.error}</span>
          )}
      </div>
    );
  }
}

InputField.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
  }),
  onBlur: PropTypes.func,
};

InputField.defaultProps = {
  type: 'text',
};

export default InputField;
