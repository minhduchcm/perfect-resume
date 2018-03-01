import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Description.scss';

import LinkButton from 'component/LinkButton/LinkButton';

class Description extends PureComponent {
  render() {
    return (
      <div className={styles.description}>
        <h2>Create a standout resume in minutes</h2>
        <p>
          Easily create professional resumes, online portfolios and personal
          landing pages
        </p>
        <LinkButton as={NavLink} to="/app" solid color="red">
          BUILD A RESUME NOW
        </LinkButton>
      </div>
    );
  }
}

Description.propTypes = {};

export default Description;
