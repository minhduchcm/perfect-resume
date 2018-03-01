import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Navbar.scss';

import Fa from 'component/Fa/Fa';

import NavLink from '../NavLink/NavLink';

class Navbar extends Component {
  render() {
    return (
      <div className={styles.navbar}>
        <NavLink>Dashboard</NavLink>
        <NavLink>Stat</NavLink>
        <div className="_blank" />
        <NavLink>
          <Fa icon="star" />
        </NavLink>
      </div>
    );
  }
}

Navbar.propTypes = {};

export default Navbar;
