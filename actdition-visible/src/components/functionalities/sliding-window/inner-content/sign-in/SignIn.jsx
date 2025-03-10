import React, { useState, Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import styles from './SignIn.module.css';

const Registration = lazy(() => import("../registration/Registration.jsx"));
const ForgotPassword = lazy(() => import("../forgot-password/ForgotPasword.jsx"));

const ComponentMap = {
  Registration: Registration,
  ForgotPassword: ForgotPassword,
};

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [isChosen, setChoice] = useState(null);

  const ComponentToRender = ComponentMap[isChosen] || null;

  const handleChoice = (choice) => {
    setChoice(choice);
    console.log("Choice is: ", choice);
  };

  const handleReturn = () => {
    setChoice(null);
  };

  
  // #region Validaton
  
  const validateForm = async (event) => {
    event.preventDefault();

    // Mock API call to validate user credentials
    // const isValidUser = await mockApiCall(username, passphrase);
    const isValidUser = false;
    console.log(username, passphrase);

    if (!username || !passphrase) {
      setErrorMessage("Username and password are required!");
      setTimeout(() => {
        setErrorMessage("");s
      }, 4000);
      return;
    }

    if (isValidUser) {
      setErrorMessage("");
      navigate("/new-arrivals");
    } else {
      setErrorMessage("Invalid username or password!");
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
      return;
    }
  };

  // #endregion

  return (
    <>
      <Suspense fallback={<div className={styles.holdup}>Loading...</div>}>
        {ComponentToRender ? (
          <>
            <div className={styles.button}>
              <ComponentToRender />
              <div className={styles.infopult}>
                <a className={styles.signinoptions} onClick={() => handleReturn()}>
                  Return to the sign in section
                </a>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.subtitle}>Signing in</div>
            <br />
            <br />
            <div className={styles.button}>
              <div className={styles.fillarea}>
                <div className={styles.form}>
                  <label className={styles.textlabel} htmlFor="email-or-phone">
                    E-mail or phone number
                  </label>
                  <input
                    className={styles.finput}
                    type="text"
                    id="email-or-phone"
                    name="email-or-phone"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <span className={styles.iborder}></span>
                </div>
                <div className={styles.form}>
                  <label className={styles.textlabel} htmlFor="passphrase">
                    Password
                  </label>
                  <input
                    className={styles.finput}
                    type="password"
                    id="passphrase"
                    name="passphrase"
                    onChange={(e) => setPassphrase(e.target.value)}
                  />
                  <span className={styles.iborder}></span>
                </div>
                <br />
                <button onClick={validateForm} className={styles.submit}>
                  <span className="text">Sign in</span>
                  <span>Welcome</span>
                </button>
                <br />
                <button type="button" className={styles.googlebutton} disabled>
                  Continue with Google
                </button>
              
                <p className={styles.error}>{errorMessage}</p>
              </div>
              <div className={styles.infopult}>
                <a
                  className={styles.signinoptions}
                  onClick={() => handleChoice("Registration")}
                >
                  Registration
                </a>
                <a
                  className={styles.signinoptions}
                  onClick={() => handleChoice("ForgotPassword")}
                >
                  Forgot password?
                </a>
              </div>
            </div>
          </>
        )}
      </Suspense>
    </>
  );
};
export default SignIn;
