import React from "react";
import styles from './CustomPrompts.module.css';

/*

const ActorPrompt = ({ unfinished_user }) => {
  const handleClick = () => {
    alert(`Button clicked for actor: ${unfinished_user.name}`);
  };

  return (
    <div className={styles.promptContainer}>
      <h2>Actor Prompt</h2>
      <p>User name: {unfinished_user.name}</p>
      <input type="text" placeholder="Actor specific input" />
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
};

*/

const ActorPrompt = ({ data }) => (
  <>

  </>
);

const CastingDirectorPrompt = ({ data }) => (
  <>
    {data.username}
    {data.position}
  </>
);

const ProducerPrompt = ({ data }) => (
  <>

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