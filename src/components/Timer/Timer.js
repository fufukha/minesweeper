import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useInterval from './useInterval';
import useEffectSkipFirst from './useEffectSkipFirst';
import isWinStateSelector from '../../selectors/isWinState';
import isLoseStateSelector from '../../selectors/isLoseState';
import styles from './timer.css';

const Timer = () => {
  const { startTime, hasStarted } = useSelector(state => state.status);
  const isWinState = useSelector(isWinStateSelector);
  const isLoseState = useSelector(isLoseStateSelector);
  const [ timerText, setTimerText ] = useState('000');
  const [ delay, setDelay ] = useState(500);

  useInterval(() => {
    if (startTime) {
      const text = getTimerText(startTime);
      if (text === '999') setDelay(null);
      setTimerText(text);
    }
  }, delay, startTime)

  useEffectSkipFirst(() => {
    if (!(hasStarted && !isWinState && !isLoseState)) setDelay(null)
  }, [hasStarted, isLoseState, isWinState])

  return (
    <div className={styles.timer}>888
      <div>{timerText}</div>
    </div>
  );
}

export default Timer;

const getTimerText = initialTime => {
  const time = elapsedTime(initialTime)
  return  threeDigitStr(time);
}

const elapsedTime = initialTime => {
  const presentTime = new Date().getTime();
  return presentTime - initialTime;
}

const threeDigitStr = milliseconds => {
  const seconds = Math.floor(milliseconds / 1000);
  const text = seconds.toString().padStart(3,0);
  return text;
}
