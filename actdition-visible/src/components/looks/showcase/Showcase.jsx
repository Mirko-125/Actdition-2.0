import React from 'react';
import styles from './Showcase.module.css';

function Showcase() {

  return (
    <>
        <div className={styles.group}>
          <div className={styles.showcase}>
              <figure id={styles.showcase}>
                  <section></section>
                  <section></section>  
                  <section></section>  
                  <section></section>  
              </figure>
          </div>
          <div className={styles.info}>
          For casting directors and producers, Actdition simplifies the talent discovery process. Its intuitive interface allows them to post casting calls, browse candidate profiles, and manage auditions effortlessly. Built-in collaboration features make it seamless to share feedback and make data-driven casting decisions within teams.
          </div>
        </div>
    </>
  )
}

export default Showcase
