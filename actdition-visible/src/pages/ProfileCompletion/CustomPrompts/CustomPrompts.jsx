import React from "react";
import styles from './CustomPrompts.module.css';

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