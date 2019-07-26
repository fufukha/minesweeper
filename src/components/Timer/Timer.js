import React, { useState } from "react";
import PropTypes from "prop-types";
import useInterval from './useInterval';
import useEffectSkipFirst from './useEffectSkipFirst';
import './timer.css';

const Timer = ({startTime, isRunning}) => {
    const [ timerText, setTimerText ] = useState('');
    const [ delay, setDelay ] = useState(500);

    useInterval(() => {
        if(startTime) {
            const text = getTimerText(startTime);
            if(text == '999') setDelay(null);
            setTimerText(text);
        }
    }, delay, startTime)

    useEffectSkipFirst(() => {
        if(isRunning === false) setDelay(null)
    }, [isRunning])

    return (
    <div className='scoreBoard-numbers'>888
      <div>{timerText}</div>
    </div>
    );
}

const getTimerText = (initialTime) => {
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

 Timer.propTypes = {
   startTime: PropTypes.number,
   isRunning: PropTypes.bool
};

export default Timer;
