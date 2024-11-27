import React from 'react';
import styles from './Navbar.module.css';

function Navbar() {
    
    return (
        <>    
            <nav className={styles.navbar}>
            <li className={styles.link}><a onClick={() => console.log("haha")}><span className={styles.circle} data-color="how-it-works">B</span>How it works</a></li>
            <li className={styles.link}><a onClick={() => console.log("haha")}><span className={styles.circle} data-color="sign-in">A</span>Sign in</a></li>
            </nav>
        </>
    )
}

export default Navbar;