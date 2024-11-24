import React from 'react';
import styles from './Navbar.module.css';

function Navbar() {
    <>
        <nav className={styles.navbar}>
            <ul className={styles.navigationlinks}>
                <li className={styles.link}><a onClick={() => navigate('/')} className={styles.clickablelink}>How it works</a></li>
                <li className={styles.link}><a onClick={() => navigate('/')} className={styles.clickablelink}>Sign in</a></li>
            </ul>
        </nav>
    </>
}

export default Navbar;