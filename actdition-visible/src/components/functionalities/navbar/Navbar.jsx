import React from 'react';
import styles from './Navbar.module.css';

function Navbar() {
    
    return (
        <>    
            <nav className={styles.navbar}>
            <li className={styles.link}><a onClick={() => console.log("haha")}>How it works & About<span className={styles.circle} data-color="how-it-works">B</span><span className={styles.line}></span></a></li>
            <li className={styles.link}><a onClick={() => console.log("haha")}><span className={styles.circle} data-color="sign-in">A</span>Sign in</a></li>
            </nav>
        </>
    )
}

export default Navbar;