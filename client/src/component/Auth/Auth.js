import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { getCurrentUser } from 'data-providers/users';

class Auth extends Component {
  render() {
    const { isAuthorized, children, location } = this.props;
    if (isAuthorized) return children;
    let redirectUrl = `/login?redirect=${location.pathname}`;
    if (location.search !== '') {
      redirectUrl += location.search;
    }
    return <Redirect to={redirectUrl} />;
  }
}

Auth.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    fullname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  roles: PropTypes.arrayOf(PropTypes.string),
};

const mapStateToProps = (state, ownerProps) => {
  const currentUser = getCurrentUser(state);
  return {
    location: state.get('router').location,
    currentUser,
    isAuthorized: currentUser !== null,
  };
};

export default connect(mapStateToProps)(Auth);
