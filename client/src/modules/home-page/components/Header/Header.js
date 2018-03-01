import React, { PureComponent } from 'react';
import styles from './Header.scss';

import Logo from 'component/Logo/Logo';

import Navbar from 'modules/home-page/components/Navbar/Navbar';
import Description from 'modules/home-page/components/Description/Description';

class Header extends PureComponent {
  render() {
    return (
      <div className={styles.header}>
        <Navbar />
        <Logo />
        <Description />
      </div>
    );
  }
}
export default Header;
