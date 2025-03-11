import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../global.module.css';

const Registration = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = React.useState('');
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        passphrase: '',
        c_passphrase: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = async (event) => {
        event.preventDefault();

        if (!formData.name) {
            setErrorMessage('Name is required!');
            setTimeout(() => {
            setErrorMessage('');
            }, 4000);
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            setErrorMessage('E-mail is required!');
            setTimeout(() => {
            setErrorMessage('');
            }, 4000);
            return;
        } else if (!emailPattern.test(formData.email)) {
            setErrorMessage('E-mail is not valid!');
            setTimeout(() => {
            setErrorMessage('');
            }, 4000);
            return;
        }

        const phonePattern = /^\d{10}$/;
        if (!formData.phone) {
            setErrorMessage('Phone number is required!');
            setTimeout(() => {
            setErrorMessage('');
            }, 4000);
            return;
        } else if (!phonePattern.test(formData.phone)) {
            setErrorMessage('Phone number is not valid!');
            setTimeout(() => {
            setErrorMessage('');
            }, 4000);
            return;
        }

        if (!formData.passphrase) {
            setErrorMessage('Password is required!');
            setTimeout(() => {
            setErrorMessage('');
            }, 4000);
            return;
        }

        if (formData.passphrase !== formData.c_passphrase) {
            setErrorMessage('Passwords do not match!');
            setTimeout(() => {
            setErrorMessage('');
            }, 4000);
            return;
        }

        navigate('/page');
    };

    return (
        <>
            <div className={styles.subtitle}>Registration</div>
            <br />
            <div className={styles.fillarea}>
                <div className={styles.form}>
                    <label className={styles.textlabel} >Full name</label>
                    <input className={styles.finput} type="text" id="name" name="name" onChange={handleChange} />
                    <span className={styles.iborder}></span>
                </div>
                <div className={styles.form}>
                    <label className={styles.textlabel}>E-mail</label>
                    <input className={styles.finput} type="text" id="email" name="email" onChange={handleChange} />
                    <span className={styles.iborder}></span>
                </div>
                <div className={styles.form}>
                    <label className={styles.textlabel}>Phone number</label>
                    <input className={styles.finput} type="text" id="phone" name="phone" onChange={handleChange} />
                    <span className={styles.iborder}></span>
                </div>
                <div className={styles.form}>
                    <label className={styles.textlabel}>Password</label>
                    <input className={styles.finput} type="password" id="passphrase" name="passphrase" onChange={handleChange} />
                    <span className={styles.iborder}></span>
                </div>
                <div className={styles.form}>
                    <label className={styles.textlabel}>Confirm password</label>
                    <input className={styles.finput} type="password" id="c_passphrase" name="c_passphrase" onChange={handleChange} />
                    <span className={styles.iborder}></span>
                </div>
                <br />
                <button className={styles.submit}onClick={validateForm}><span className="text">Register</span><span>Hello</span></button>
                <p className={styles.error}>{errorMessage}</p>
                <br />
            </div>
        </>
    );
};

export default Registration;