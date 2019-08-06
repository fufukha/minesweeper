import React from 'react';
import Timer from '../Timer/Timer';
import Face from '../Face/Face';
import FlagCounter from '../FlagCounter/FlagCounter';
import styles from './scoreboard.css';

const Scoreboard = () => {
  return (
    <div className={styles.scoreboard}>
      <Timer/>
      <Face />
      <FlagCounter />
    </div>
  );
}

export default Scoreboard;
