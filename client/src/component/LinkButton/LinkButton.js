import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './LinkButton.scss';

class LinkButton extends PureComponent {
  render() {
    const {
      children,
      className,
      outline,
      solid,
      size,
      color,
      as: AsComponent,
      ...rest
    } = this.props;
    return (
      <AsComponent
        className={cx(styles.linkButton, className, {
          [styles.outline]: outline,
          [styles.solid]: solid,
          [styles.large]: size === 'large',
          [styles[color]]: color !== 'transparent',
        })}
        {...rest}
      >
        {children}
      </AsComponent>
    );
  }
}

LinkButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,
  as: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func,
  ]),
  color: PropTypes.string,
  outline: PropTypes.bool,
  size: PropTypes.string,
};

LinkButton.defaultProps = {
  as: 'a',
  outline: false,
  solid: false,
  size: 'normal',
  color: 'transparent',
};

export default LinkButton;
