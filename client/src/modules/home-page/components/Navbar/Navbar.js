import React, { PureComponent, Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Navbar.scss';

import LinkButton from 'component/LinkButton/LinkButton';
import AuthCheck from 'component/AuthCheck/AuthCheck';

class Navbar extends PureComponent {
  render() {
    return (
      <div className={styles.navbar}>
        <AuthCheck>
          {(isAuthorized, currentUser) => {
            if (isAuthorized) {
              return (
                <Fragment>
                  <LinkButton as={NavLink} to="/app">
                    Hello "{currentUser.fullname}"!
                  </LinkButton>
                  <LinkButton as={NavLink} to="/logout" outline>
                    Logout
                  </LinkButton>
                </Fragment>
              );
            } else {
              return (
                <Fragment>
                  <LinkButton as={NavLink} to="/login">
                    Login
                  </LinkButton>
                  <LinkButton as={NavLink} to="/signup" outline>
                    Sign up
                  </LinkButton>
                </Fragment>
              );
            }
          }}
        </AuthCheck>
      </div>
    );
  }
}

Navbar.propTypes = {};

export default Navbar;
