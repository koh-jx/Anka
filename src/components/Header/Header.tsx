import React, { ReactElement } from 'react'

import styles from './Header.module.css';
import logo from '../../assets/logo.png';
 
function Header(): ReactElement {
    return (
        <div className={styles.header}>
            {/* <h2 className={styles.title}>Anka</h2> */}
            <img
                className={styles.logo}
                src={logo}
                alt="Anka"
            />
        </div>
    );
}

export default Header;