import React from 'react';
import { useSelector } from 'react-redux';
import isWinStateSelector from '../../selectors/isWinState';
import isLoseStateSelector from '../../selectors/isLoseState';
import styles from './face.css';

const Face = () => {
  const isTilePressed = useSelector(state => state.isTilePressed);
  const isWinState = useSelector(isWinStateSelector);
  const isLoseState = useSelector(isLoseStateSelector);

  return (
    <div className={styles.face}>
      {getFaceExpression(isWinState, isLoseState, isTilePressed)}
    </div>
  )
};

export default Face;

const getFaceExpression = (isWinState, isLoseState, isTilePressed) => {
  if (isWinState) return '😎';
  if (isLoseState) return '😵';
  if (isTilePressed) return '😮'
  return '🙂'
}
