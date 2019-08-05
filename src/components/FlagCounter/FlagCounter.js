import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useEffectSkipFirst from './useEffectSkipFirst';
import styles from './flagCounter.css';

const FlagCounter = () => {
  const flags = useSelector(state => state.tiles.flagged);
  const mines = useSelector(state => state.board.mines);
  const numberMinesText = threeDigitStr(mines)
  const [ flagCounterText, setFlagCounterText ] = useState(numberMinesText);

  useEffectSkipFirst(() => {
    const flagCount = numberObjectKeys(mines) - numberObjectKeys(flags);
    const text = threeDigitStr(flagCount);
    setFlagCounterText(text)
  }, [flags, mines]);

  return (
    <div className={styles.flagCounter}>888
      <div>{flagCounterText}</div>
    </div>
  );
}

export default FlagCounter;

const numberObjectKeys = object => {
  let numberOfKeys = 0;
  for (var key in object) {
    numberOfKeys+= Object.keys(object[key]).length;
  }
  return numberOfKeys
}

const threeDigitStr = number => {
  if (number < 0 && number > -100) {
    const text = '-' + Math.abs(number).toString().padStart(2,0);
    return text;
  } else if ( number < -99) {
    return '-99';
  } else if (number > -1 && number < 1000) {
    const text = number.toString().padStart(3,0);
    return text;
  } else if (number > 999) {
    return '999'
  }
}
