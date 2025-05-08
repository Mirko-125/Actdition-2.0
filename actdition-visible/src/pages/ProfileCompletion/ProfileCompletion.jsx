import React from "react";
import styles from './ProfileCompletion.module.css';

function ProfileCompletion() {
    let data = JSON.parse(sessionStorage.getItem("unfinished user"));
    sessionStorage.removeItem("unifinished user")

    console.table(data);
    return (
      <>
        <div className={styles.paintmered}>
            Hi
        </div>
      </>
    );
  }
  
  export default ProfileCompletion;
  