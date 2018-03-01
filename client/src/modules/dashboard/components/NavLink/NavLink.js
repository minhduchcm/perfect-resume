import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink as ReactNavLink } from 'react-router-dom';
import cx from 'classnames';

import styles from './NavLink.scss';

class NavLink extends Component {
  render() {
    const { children, className } = this.props;
    return (
      <ReactNavLink className={cx(styles.navLink, className)}>
        {children}
      </ReactNavLink>
    );
  }
}

NavLink.propTypes = {};

export default NavLink;
