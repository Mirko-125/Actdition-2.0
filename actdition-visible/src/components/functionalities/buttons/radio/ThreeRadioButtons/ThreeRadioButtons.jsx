import { React } from "react";
import styles from './ThreeRadioButtons.module.css';

function ThreeRadioButtons({ title , options, name, selected, onChange }) {
  {
    return (
      <div className={styles.radiogroup}>
        <label className={styles.textlabel}>{title}</label>
        {options.map(({ value, label }) => (
          <label key={value} className={styles.radioitem}>
            <span className={styles.radiolabeltext}>{label}</span>
            <input
              type="radio"
              name={name}
              value={value}
              checked={selected === value}
              onChange={onChange}
            />
          </label>
        ))}
      </div>
    );
  }
}

export default ThreeRadioButtons;
