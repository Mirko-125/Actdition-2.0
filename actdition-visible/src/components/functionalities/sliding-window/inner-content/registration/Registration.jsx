import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../global.module.css";
import RadioButtonsHorizontal from "../../../buttons/radio/RadioButtonsHorizontal/RadioButtonsHorizontal";
import RadioButtonsVertical from "../../../buttons/radio/RadioButtonsVertical/RadioButtonsVertical";

const Registration = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [gender, setGender] = useState("o");
  const [position, setPosition] = useState("admin");

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    username: "",
    email: "",
    phone: "",
    passphrase: "",
    c_passphrase: "",
  });

  const checkavailAbility = async (identifier) => {
    try {
      const response = await fetch(
        `http://localhost:5135/api/Users/checkavailability?identifier=${identifier}`
      );
      console.log(response);
      if (response.status == 400) {
        console.log(`${identifier} is already taken.`);
        setErrorMessage(`${identifier} is already taken.`);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((fd) => ({ ...fd, [name]: value }));
  };

  const trimName = () => {
    const parts = formData.name.trim().split(/\s+/);
    const first = parts[0] || "";
    const last = parts.length > 1 ? parts.slice(1).join(" ") : "";

    setFormData((fd) => ({
      ...fd,
      name: first,
      lastname: last,
    }));
  };
  const validateForm = async (event) => {
    event.preventDefault();

    checkavailAbility(formData.username);

    const payload = { ...formData, gender, position };

    if (!formData.name) {
      setErrorMessage("Name is required!");
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
      return;
    }

    const usernamePattern = /^(?=[\w.-]{5,20}$)(?:[\d_.-]*[a-zA-Z]){3}[\w.-]*$/; // change this for what you need
    if (!formData.username) {
      setErrorMessage("Username is required!");
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      setErrorMessage("E-mail is required!");
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
      return;
    } else if (!emailPattern.test(formData.email)) {
      setErrorMessage("E-mail is not valid!");
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
      return;
    }

    const phonePattern = /^\d{13}$/;
    if (!formData.phone) {
      setErrorMessage("Phone number is required!");
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
      return;
    } else if (!phonePattern.test(formData.phone)) {
      setErrorMessage("Phone number is not valid!");
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
      return;
    }

    if (!formData.passphrase) {
      setErrorMessage("Password is required!");
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
      return;
    }

    if (formData.passphrase !== formData.c_passphrase) {
      setErrorMessage("Passwords do not match!");
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
      return;
    }

    try {
      const res = await fetch("http://localhost:5135/api/Users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        // throw new Error(`Server error: ${res.status}`);
        setErrorMessage(`Server error: ${res.status}`);
      }
      // res is ok further on
      const result = await res.json(); // the unfinished user is stored in the result object
      console.log(res.status);

      sessionStorage.setItem("unfinished user", JSON.stringify(result));
      navigate("/complete-profile");
    } catch (err) {
      setErrorMessage(err.message);
      setTimeout(() => setErrorMessage(""), 4000);
    }
  };

  return (
    <>
      <div className={styles.subtitle}>Registration</div>
      <br />
      <div className={styles.fillarea}>
        <div className={styles.form}>
          <label className={styles.textlabel}>Full name</label>
          <input
            className={styles.finput}
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            onBlur={trimName}
          />
          <span className={styles.iborder}></span>
        </div>
        <div className={styles.form}>
          <label className={styles.textlabel}>Username</label>
          <input
            className={styles.finput}
            type="text"
            id="username"
            name="username"
            onChange={handleChange}
          />
          <span className={styles.iborder}></span>
        </div>
        <RadioButtonsHorizontal
          title="Gender"
          name="gender"
          selected={gender}
          onChange={(e) => setGender(e.target.value)}
          options={[
            { value: "f", label: "♀" },
            { value: "m", label: "♂" },
          ]}
        />
        <div className={styles.form}>
          <label className={styles.textlabel}>E-mail</label>
          <input
            className={styles.finput}
            type="text"
            id="email"
            name="email"
            onChange={handleChange}
          />
          <span className={styles.iborder}></span>
        </div>
        <div className={styles.form}>
          <label className={styles.textlabel}>Phone number</label>
          <input
            className={styles.finput}
            type="text"
            id="phone"
            name="phone"
            onChange={handleChange}
          />
          <span className={styles.iborder}></span>
        </div>
        <div className={styles.form}>
          <label className={styles.textlabel}>Password</label>
          <input
            className={styles.finput}
            type="password"
            id="passphrase"
            name="passphrase"
            onChange={handleChange}
          />
          <span className={styles.iborder}></span>
        </div>
        <div className={styles.form}>
          <label className={styles.textlabel}>Confirm password</label>
          <input
            className={styles.finput}
            type="password"
            id="c_passphrase"
            name="c_passphrase"
            onChange={handleChange}
          />
          <span className={styles.iborder}></span>
        </div>
        <RadioButtonsVertical
          title="Position"
          name="button"
          options={[
            { value: "actor", label: "Actor" },
            { value: "castingdirector", label: "Casting director" },
            { value: "producer", label: "Producer" },
          ]}
          selected={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <button className={styles.submit} onClick={validateForm}>
          <span className="text">Register</span>
          <span>Hello</span>
        </button>
        <p className={styles.error}>{errorMessage}</p>
        <br />
      </div>
    </>
  );
};

export default Registration;
