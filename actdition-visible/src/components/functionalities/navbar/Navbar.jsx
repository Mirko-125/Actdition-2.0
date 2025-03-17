import { React, useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";

import styles from './Navbar.module.css';

import SlidingWindow from '../sliding-window/SlidingWindow.jsx';

function Navbar( { Page = null } ) {

    const ComponentToRender = Page;

    const navigate = useNavigate();
    

    // #region SlidingWindow
    const [isMotive, setMotive] = useState(null);
    const slidingWindowRef = useRef(null);
    
    const [isSlidingWindowVisible, setSlidingWindowVisible] = useState(false);
    const [slidingWindowContent, setSlidingWindowContent] = useState('');

    function toggleSlidingWindow(content = '', motive)
    {
        setMotive(motive);
        setSlidingWindowContent(content);
        setSlidingWindowVisible(!isSlidingWindowVisible);
    }

    useEffect(() => {
        const handleClickOutside = (event) => 
        {
            if (slidingWindowRef.current && !slidingWindowRef.current.contains(event.target)) {
                setSlidingWindowVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // #endregion

    return (
        <>    
            <nav className={styles.navbar}>
                { ComponentToRender ? 
                    (
                        <>
                            <li className={styles.link}><a onClick={() => navigate("/")}><span className={styles.line}></span><span className={styles.circle} data-color="title">1</span>Back to title screen</a>
                            </li>
                        </>
                    ) : 
                    (
                        <>
                            <li className={styles.link}><a onClick={() => navigate("/manual")}>How it works & About<span className={styles.circle} data-color="how-it-works">B</span><span className={styles.line}></span></a>
                            </li>
                        </>
                    )
                }
                <li className={styles.link}><a onClick={() => toggleSlidingWindow("","SignIn")}><span className={styles.circle} data-color="sign-in">A</span>Sign in</a
                ></li>
            </nav>

            {isSlidingWindowVisible && <div className={styles.fade}></div>}
            <div ref={slidingWindowRef}>
                <SlidingWindow isVisible={isSlidingWindowVisible} onClose={() => setSlidingWindowVisible(false)} content={slidingWindowContent} motive={isMotive}/>
            </div>
        </>
    )
}

export default Navbar;