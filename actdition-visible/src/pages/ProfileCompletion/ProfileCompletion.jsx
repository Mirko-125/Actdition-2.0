import React from "react";
import styles from './ProfileCompletion.module.css';
import CustomPrompts from "./CustomPrompts/CustomPrompts";

function ProfileCompletion() {
    let data = JSON.parse(sessionStorage.getItem("unfinished user"));
    sessionStorage.removeItem("unifinished user")


    // 3 seperate form components, and depending on the role the one will be generated

    return (
      <>
        <CustomPrompts unfinished_user={data}/>
      </>
    );
  }
  
  export default ProfileCompletion;
  