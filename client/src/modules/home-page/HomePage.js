import React, { Component } from 'react';
import styles from './HomePage.scss';

import Header from 'modules/home-page/components/Header/Header';

class HomePage extends Component {
  render() {
    return (
      <div className={styles.homePage}>
        <Header />
      </div>
    );
  }
}

HomePage.propTypes = {};

export default HomePage;
