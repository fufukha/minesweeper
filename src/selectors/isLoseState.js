import { createSelector } from 'reselect';

const minesSelector = state => state.board.mines;
const displayedSelector = state => state.tiles.displayed;

const isLoseStateSelector = createSelector(
    [minesSelector, displayedSelector],
    (mines, displayed) => (
        !Object.keys(mines).reduce((acc, i) => {
            return acc && (
                Object.keys(mines[i]).reduce((acc2, j) => {
                    return acc2 && (valueAt(displayed, i, j) === false)
                }, true)
            )
        }, true)
    )
);

const valueAt = (object, i, j) =>  Boolean(object[i] && object[i][j]);

export default isLoseStateSelector;
