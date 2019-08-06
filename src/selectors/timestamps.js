import { createSelector } from 'reselect';
import isLoseStateSelector from './isLoseState';
import isWinStateSelector from './isWinState';

const lastClickTimeSelector = state => state.lastClickedTile.lastClickTime;
const startTimeSelector = state => state.status.startTime;

const timestampsSelector = createSelector(
  [
    lastClickTimeSelector,
    startTimeSelector,
    isLoseStateSelector,
    isWinStateSelector
  ],
  (lastClickTime, startTime, isLoseState, isWinState) => {
    const isGameEnded = (startTime && (isLoseState || isWinState));
    const endTime = isGameEnded ? lastClickTime : null;
    return {
      startTime,
      endTime
    }
  }
);

export default timestampsSelector;
