import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrentUser } from 'data-providers/users';

class AuthCheck extends Component {
  render() {
    const { isAuthorized, currentUser, children } = this.props;
    return children(isAuthorized, currentUser);
  }
}

AuthCheck.propTypes = {
  children: PropTypes.func.isRequired,
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
    currentUser,
    isAuthorized: currentUser !== null,
  };
};

export default connect(mapStateToProps)(AuthCheck);
