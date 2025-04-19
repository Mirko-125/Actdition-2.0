import React from "react";
import styles from "./RadioButtonsHorizontal.module.css";

function RadioButtonsHorizontal({
  title,
  options,    
  name,
  selected,
  onChange
}) {
  return (
    <div className={styles.radiogroup}>
      {title && <div className={styles.title}>{title}</div>}

      <div className={styles.options}>
        {options.map(({ value, label }) => (
          <label key={value} className={styles.radioitem}>
            <input
              type="radio"
              name={name}
              value={value}
              checked={selected === value}
              onChange={onChange}
            />
            <span className={styles.radiolabeltext}>{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default RadioButtonsHorizontal;
