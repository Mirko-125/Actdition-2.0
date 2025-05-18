import React from "react";
import styles from "./CustomPrompts.module.css";
import global from "../../../components/functionalities/sliding-window/inner-content/global.module.css";

const ActorPrompt = ({ data }) => (
  <>
    <div className={styles.parent}>
      <div className={global.fillarea}>
        <div className={global.form}>
          <label className={global.textlabel}>Height</label>
          <input
            className={global.finput}
            type="number"
            min="0"
            step="0.01"
            id="name"
            name="height"
            placeholder="Value [m], e.g. 1.91 m"
          />
          <span className={global.iborder}></span>
        </div>
        <div className={global.form}>
          <label className={global.textlabel}>Weight</label>
          <input
            className={global.finput}
            type="number"
            min="0"
            step="0.1"
            id="name"
            name="weight"
            placeholder="Value [kg], e.g. 90.5 kg"
          />
          <span className={global.iborder}></span>
        </div>
        <div className={global.form}>
          <label className={global.textlabel}>D.O.B.</label>
          <input
            className={global.finput}
            max="2008-1-1"
            type="date"
            id="name"
            name="birthdate"
          />
          <span className={global.iborder}></span>
        </div>
        <div className={global.form}>
          <label className={global.textlabel} htmlFor="bio">
            Bio
          </label>
          <textarea
            className={global.finput}
            id="bio"
            name="bio"
            rows={6}
            placeholder="Write your bio here..."
            maxLength={2000}
          />
          <span className={global.iborder}></span>
        </div>
      </div>
      <button className={global.submit} onClick={console.log("dog")}>
        <span className="text">Done</span>
        <span>Hi</span>
      </button>
    </div>
  </>
);

const CastingDirectorPrompt = ({ data }) => (
  <>
    <div className={global.fillarea}>
      <div className={global.form}>
        <label className={global.textlabel}>Production code</label>
        <input
          className={global.finput}
          id="name"
          maxLength={6}
          placeholder="Enter a six char code"
          name="code"
        />
        <span className={global.iborder}></span>
      </div>
    </div>
    <div className={styles.parent}>
      <button className={global.submit} onClick={console.log("dog")}>
        <span className="text">Done</span>
        <span>Get in</span>
      </button>
    </div>
  </>
);

const ProducerPrompt = ({ data }) => (
  <>
    <div className={styles.parent}>
      <div className={global.fillarea}>
        <div className={global.form}>
          <label className={global.textlabel}>D.O.B.</label>
          <input
            className={global.finput}
            max="2008-1-1"
            type="date"
            id="name"
            name="birthdate"
          />
          <span className={global.iborder}></span>
        </div>
        <div className={global.form}>
          <label className={global.textlabel} htmlFor="bio">
            Bio
          </label>
          <textarea
            className={global.finput}
            id="bio"
            name="bio"
            rows={6}
            placeholder="Write your bio here..."
            maxLength={2000}
          />
          <span className={global.iborder}></span>
        </div>
      </div>
      <div className={styles.subtitle}>Production creation:</div>
      <div className={global.fillarea}>
        <div className={global.form}>
          <label className={global.textlabel}>Production name</label>
          <input
            className={global.finput}
            type="text"
            id="productionname"
            name="productionname"
          />
          <span className={global.iborder}></span>
        </div>
        <div className={global.form}>
          <label className={global.textlabel}>Production name</label>
          <input
            className={global.finput}
            type="text"
            id="productionname"
            name="productionname"
            placeholder="Enter a six digit code"
          />
          <span className={global.iborder}></span>
        </div>
      </div>
      <button className={global.submit} onClick={console.log("dog")}>
        <span className="text">Done</span>
        <span>Get in</span>
      </button>
    </div>
  </>
);

const PositionComponents = {
  actor: ActorPrompt,
  castingdirector: CastingDirectorPrompt,
  producer: ProducerPrompt,
};

function CustomPrompts({ unfinished_user }) {
  const PositionComponent = PositionComponents[unfinished_user.position];

  if (!PositionComponent) {
    return (
      <div className={styles.error}>
        Neki eror koji ces blagovremeno napisati 😉
      </div>
    );
  }

  return <PositionComponent data={unfinished_user} />;
}

export default CustomPrompts;
