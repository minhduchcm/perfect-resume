import React, { PureComponent } from 'react';
import Auth from 'component/Auth/Auth';

import styles from './Dashboard.scss';
import Navbar from '../Navbar/Navbar';

class Dashboard extends PureComponent {
  render() {
    return (
      <Auth>
        <div className={styles.container}>
          <Navbar />
        </div>
      </Auth>
    );
  }
}

Dashboard.propTypes = {};

export default Dashboard;
