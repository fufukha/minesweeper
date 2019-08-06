import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import timestampsSelector from '../../selectors/timestamps';
import styles from './timer.css';

const Timer = () => {
  const { startTime, endTime } = useSelector(timestampsSelector);
  const [ blah, setBlah ] = useState(true);
  const timerText = startTime ? getTimerText(startTime, endTime) : '000';
  const triggerRender = () => setBlah(!blah);

  useEffect(() => {
    const id = setInterval(triggerRender, 500);
    return () => clearInterval(id);
  });

  return (
    <div className={styles.timer}>888
      <div>{timerText}</div>
    </div>
  );
}

export default Timer;

const getTimerText = (initialTime, endTime) => {
  const time = elapsedTime(initialTime, endTime)
  return  threeDigitStr(time);
}

const elapsedTime = (initialTime, endTime) => {
  return (endTime || new Date().getTime()) - initialTime;
}

const threeDigitStr = milliseconds => {
  const seconds = Math.min(Math.floor(milliseconds / 1000), 999);
  const text = seconds.toString().padStart(3,0);
  return text;
}
