import React from "react";
import styles from './ProfileCompletion.module.css';
import CustomPrompts from "./CustomPrompts/CustomPrompts";

function ProfileCompletion() {
    let data = JSON.parse(sessionStorage.getItem("unfinished user"));
    sessionStorage.removeItem("unifinished user")
    console.table(data.position);

    // 3 seperate form components, and depending on the role the one will be generated
    // profile picture uploader
    return (
      <>
        <div className={styles.theme}>
          <div className={styles.focus}>
            <div className={styles.finished}>
              50% child
            </div>
            <div className={styles.unfinished}>
              50% child
              <CustomPrompts unfinished_user={data}/>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default ProfileCompletion;
  