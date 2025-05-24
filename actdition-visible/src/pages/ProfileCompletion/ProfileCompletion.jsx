import React, { useState, useRef, useEffect } from "react";
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

  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const [previewUrl, setPreviewUrl] = useState(null);

  const [feedback, setFeedback] = useState(false);

  const showFeedback = () => {
    setFeedback(true);
    setTimeout(() => {
      setFeedback(false);
    }, 3000);
  };

  const handleUploadClick = (e) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a file before uploading");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      console.log(formData);
      const response = await fetch(
        `http://localhost:5135/api/Users/${data.id}/uploadProfilePicture`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const responseData = await response.text(); // json if I ever need to return the actual picture or something like that
      showFeedback();
      console.log("Upload success:", responseData);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

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

  useEffect(() => {
    fetchIfExists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchIfExists = async () => {
    try {
      const response = await fetch(
        `http://localhost:5135/api/Users/${data.id}/profilePicture`
      );

      if (!response.ok) {
        return;
      }

      const imageBlob = await response.blob();

      const imageObjectUrl = URL.createObjectURL(imageBlob);

      setPreviewUrl(imageObjectUrl);
    } catch (error) {
      console.error("Failed to fetch user profile image:", error);
    }
  };

  return (
    <>
      {feedback && <div className={styles.feedback}>New pic is set!</div>}
      <div className={styles.theme}>
        <div className={styles.focus}>
          <div className={styles.finished}>
            <div className={styles.frame}>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileChange}
              />
              <a className={styles.upload} onClick={handleUploadClick}>
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="+"
                    className={styles.preview}
                    onLoad={() => URL.revokeObjectURL(previewUrl)} // Čisti memoriju
                  />
                ) : (
                  "+"
                )}
              </a>
            </div>
            <button
              className={global.submit}
              onClick={handleUpload}
              disabled={!file}
            >
              <span className="text">{file ? "Upload" : "Add up"}</span>
              <span>Hot!</span>
            </button>
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
