import React, { Suspense, lazy } from 'react';
import styles from './SlidingWindow.module.css';
import x from '../../../assets/exodus.svg'

const SignIn = lazy(() => import('./inner-content/sign-in/SignIn.jsx'));

const ComponentMap =
{
    "SignIn": SignIn
};

const SlidingWindow = ({ isVisible, onClose, motive }) => {
    
    const ComponentToRender = ComponentMap[motive] || null;

    return (
      <div className={`${styles["window"]} ${isVisible ? styles.visible : ''}`}>
        <a onClick={onClose}>
          <img className={styles.exit} src={x} alt="X"/>
        </a>
        <Suspense fallback={<div className={styles.holdup}>Loading...</div>}>
          {ComponentToRender && <ComponentToRender />}
        </Suspense>
      </div>
    );
  };
  
  export default SlidingWindow;