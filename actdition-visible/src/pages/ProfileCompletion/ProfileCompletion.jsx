import React from "react";
import styles from "./ProfileCompletion.module.css";
import global from "../../components/functionalities/sliding-window/inner-content/global.module.css";
import CustomPrompts from "./CustomPrompts/CustomPrompts";
import x from "../../assets/exodus.svg";
import { useNavigate } from "react-router-dom";

function ProfileCompletion() {
  let data = JSON.parse(sessionStorage.getItem("unfinished user"));
  sessionStorage.removeItem("unifinished user");
  console.table(data);

  const navigate = useNavigate();

  const handleReturn = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5135/api/Users/byIdentifier?identifier=${data.username}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        navigate("/");
      } else if (response.status === 404) {
        console.log("User not found");
      } else {
        console.log("Delete failed");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // profile picture uploader
  return (
    <>
      <div className={styles.theme}>
        <div className={styles.focus}>
          <div className={styles.finished}>
            <div className={styles.frame}>
              <a href="#" className={styles.upload}>
                +
              </a>
            </div>
            <div className={styles.field}>
              <label className={global.textlabel}>
                {data.name} {data.lastName}{" "}
                <span className={styles.sub}>{data.gender}</span>
              </label>
            </div>
            <div className={styles.field}>
              <label className={global.textlabel}>
                <span className={styles.sub}>{data.position}</span>
              </label>
            </div>
            <div className={styles.field}>
              <label className={global.textlabel}>@{data.username}</label>
            </div>
            <div className={styles.field}>
              <label className={global.textlabel}>+{data.phone}</label>
            </div>
            <div className={styles.field}>
              <label className={global.textlabel}>{data.eMail}</label>
            </div>
          </div>
          <div className={styles.unfinished}>
            <div className={styles.exodus}>
              <a onClick={handleReturn}>
                <img className={styles.exit} src={x} alt="X" />
              </a>
            </div>
            <CustomPrompts unfinished_user={data} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileCompletion;
