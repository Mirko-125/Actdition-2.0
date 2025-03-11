import React from 'react';
import styles from '../global.module.css';

const ForgotPassword = () =>
{
    return (
        <>
            <div className={styles.subtitle}>Password recovery</div>
            <br />
            <p className={styles.howitworks}>We will send you a recovery password message via e-mail or phone number you enter down below</p>
            <br/>
            <br/>
                <div className={styles.fillarea}>
                    <div className={styles.form}>
                        <label className={styles.textlabel}>E-mail or phone number</label>
                        <input className={styles.finput} type="text" id="email-or-phone" name="email-or-phone" />
                        <span className={styles.iborder}></span>
                </div>
                <button className={styles.submit}><span className="text">Recover</span><span>See you</span></button>
            </div>
        </>
      );
    };
export default ForgotPassword;