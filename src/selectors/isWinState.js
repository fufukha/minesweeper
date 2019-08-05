import { createSelector } from 'reselect';

const tilesSelector = state => state.tiles;
const boardSelector = state => state.board;

const isWinStateSelector = createSelector(
  [tilesSelector, boardSelector],
  ({ flagged, displayed }, { rows, columns, mines }) => {
    const isAllMinesFlagged = [...Array(rows)].reduce((acc, cv, i) => {
      return acc && (
        [...Array(columns)].reduce((acc2, cv2, j) => {
          return acc2 && (valueAt(mines, i, j) === valueAt(flagged, i, j))
        }, true)
      )
    }, true);

    const isAllTilesCleared = [...Array(rows)].reduce((acc, cv, i) => {
      return acc && (
        [...Array(columns)].reduce((acc2, cv2, j) => {
          return acc2 && (valueAt(flagged, i, j) || valueAt(displayed, i, j))
        }, true)
      )
    }, true);

    return isAllMinesFlagged && isAllTilesCleared;
  }
)

const valueAt = (object, i, j) => Boolean(object[i] && object[i][j]);

export default isWinStateSelector;
