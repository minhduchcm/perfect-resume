import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from '@fortawesome/react-fontawesome';
import * as solid from '@fortawesome/fontawesome-free-solid';

import styles from './Fa.scss';
class Fa extends PureComponent {
  render() {
    const { className, icon } = this.props;
    return <Icon className={cx(styles.icon, className)} icon={solid[icon]} />;
  }
}

Fa.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
};

export default Fa;
