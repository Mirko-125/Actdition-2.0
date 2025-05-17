import React from "react";
import styles from './ProfileCompletion.module.css';
import global from '../../components/functionalities/sliding-window/inner-content/global.module.css'
import CustomPrompts from "./CustomPrompts/CustomPrompts";

function ProfileCompletion() {
    let data = JSON.parse(sessionStorage.getItem("unfinished user"));
    sessionStorage.removeItem("unifinished user")
    console.table(data);

    // 3 seperate form components, and depending on the role the one will be generated
    // profile picture uploader
    return (
      <>
        <div className={styles.theme}>
          <div className={styles.focus}>
            <div className={styles.finished}>
              <div className={styles.frame}>
                <a href="#" className={styles.upload}>+</a>
              </div>
                <div className={styles.field}>
                  <label className={global.textlabel}>{data.name} {data.lastName} <span className={styles.sub}>{data.gender}</span></label>
                </div>
                <div className={styles.field}>
                  <label className={global.textlabel}><span className={styles.sub}>{data.position}</span></label>
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
              50% child
              <CustomPrompts unfinished_user={data}/>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default ProfileCompletion;
  