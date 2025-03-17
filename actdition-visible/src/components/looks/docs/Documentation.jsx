import {React, useState, useEffect } from 'react';
import styles from './Documentation.module.css';

const sectionsData = [
    { id: 'how-it-works', label: 'How it works' },
    { id: 'producer', label: 'Producer' },
    { id: 'casting-director', label: 'Casting director'},
    { id: 'actor', label: 'Actor'},
    { id: 'about', label: 'About' }
  ];

function Documentation() {
    const [activeSection, setActiveSection] = useState(sectionsData[0].id);

    useEffect(() => {
        const sectionElements = sectionsData.map(s => document.getElementById(s.id));
    
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(entry.target.id);
              }
            });
          },
          {
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0,
          }
        );
    
        sectionElements.forEach((elem) => {
          if (elem) {
            observer.observe(elem);
          }
        });
    
        return () => {
          sectionElements.forEach((elem) => {
            if (elem) {
              observer.unobserve(elem);
            }
          });
        };
      }, []);

  return (
      <div className={styles.documentationContainer}>
          <nav className={styles.sidebar}>
            <ul>
              {sectionsData.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={activeSection === section.id ? styles.active : ''}
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.content}>

          <section id="how-it-works" className={styles.sectionBlock}>
            <h2>How It Works</h2>
            <p>
            how does this work?
            </p>
          </section>

          <section id="about" className={styles.sectionBlock}>
            <h2>About</h2>
            <p>
            og zero bug development
            </p>
          </section>

          </div>
      </div>
  )
}

export default Documentation
