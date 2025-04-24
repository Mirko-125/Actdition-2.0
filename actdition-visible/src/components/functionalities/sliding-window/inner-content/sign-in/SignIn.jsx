import React, { useState, Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../global.module.css';

const Registration = lazy(() => import("../registration/Registration.jsx"));
const ForgotPassword = lazy(() => import("../forgot-password/ForgotPasword.jsx"));

const ComponentMap = {
  Registration: Registration,
  ForgotPassword: ForgotPassword,
};

const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: "",
    passphrase: ""
  })

  const handleChange = (event) =>
  {
    const { name, value } = event.target;
    setFormData((fd) => ({ ...fd, [name]: value }));
  }

  const [isChosen, setChoice] = useState(null);

  const ComponentToRender = ComponentMap[isChosen] || null;

  const handleChoice = (choice) => {
    setChoice(choice);
    console.log("Choice is: ", choice);
  };

  const handleReturn = () => {
    setChoice(null);
  };

  const validateForm = async (event) => {
    event.preventDefault();
    console.log(formData);
    // check if user exists and rediecting
    try {
      const res = await fetch("http://localhost:5135/api/Users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        // throw new Error(`Server error: ${res.status}`);
        setErrorMessage(`Server error: ${res.status}`);
      }

      const result = await res.json();
      console.log(result.token);
      console.log(res.status);
    } catch (err) {
      setErrorMessage(err.message);
      setTimeout(() => setErrorMessage(""), 4000);
    }
  };

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
            <br />
          </>
        ) : (
          <>
            <div className={styles.subtitle}>Signing in</div>
            <br />
            <br />
            <div className={styles.button}>
              <div className={styles.fillarea}>
                <div className={styles.form}>
                  <label className={styles.textlabel}>
                    E-mail, username or phone
                  </label>
                  <input
                    className={styles.finput}
                    type="text"
                    id="identifier"
                    name="identifier"
                    onChange={handleChange}
                  />
                  <span className={styles.iborder}></span>
                </div>
                <div className={styles.form}>
                  <label className={styles.textlabel}>
                    Password
                  </label>
                  <input
                    className={styles.finput}
                    type="password"
                    id="passphrase"
                    name="passphrase"
                    onChange={handleChange}
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
