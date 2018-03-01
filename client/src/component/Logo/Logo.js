import React, { PureComponent } from 'react';
import cx from 'classnames';
import styles from './Logo.scss';

class Logo extends PureComponent {
  render() {
    const { dark, size } = this.props;
    return (
      <h1
        className={cx(styles.logo, {
          [styles.dark]: dark,
          [styles[size]]: !!size,
        })}
      >
        <span>Perfect</span> <span className={styles.strong}>Resume</span>
      </h1>
    );
  }
}

export default Logo;
