import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import isWinStateSelector from '../../selectors/isWinState';
import isLoseStateSelector from '../../selectors/isLoseState';
import {
    toggleFlag as toggleFlagAction,
    displayTile as displayTileAction,
    pressTile as pressTileAction,
    releaseTile as releaseTileAction
} from '../../actions/tileActions';
import PropTypes from "prop-types";
import './tile.css';
import classnames from 'classnames';

const Tile = ({ index }) => {
    const dispatch = useDispatch();
    const mines = useSelector(state => state.board.mines);
    const tiles = useSelector(state => state.tiles);
    const isWinState = useSelector(isWinStateSelector);
    const isLoseState = useSelector(isLoseStateSelector);
    const lastClickedTile = useSelector(state => state.lastClickedTile);
    const pressTile = () => dispatch(pressTileAction());
    const releaseTile = () => dispatch(releaseTileAction());
    const toggleFlag = () => dispatch(toggleFlagAction(index[0], index[1]));
    const displayTile = () => dispatch(displayTileAction(index[0], index[1]));
    const isDisabled = isWinState || isLoseState;
    const data = getData(mines, tiles, index, isLoseState, lastClickedTile);

    const handleOnClick = (e) => {
        e.preventDefault();
        !isDisabled && data.status === 'hidden' && displayTile();
    }

    const handleOnRightClick = (e) => {
        e.preventDefault();
        !isDisabled && toggleFlag();
    }

    const handleOnMouseDown = (e) => {
        e.preventDefault();
        pressTile();
    }

    return  (
        <div
            className={classnames('tile', getClassName(data), {red: data.status === 'displayRedBomb'})}
            onClick={handleOnClick}
            onContextMenu={handleOnRightClick}
            onMouseDown={handleOnMouseDown}
            onMouseUp={() => releaseTile()}>
            {getValue(data)}
        </div>
    )
}

export default Tile;

const getData = (mines, tiles, [row, column], isLoseState, lastClickedTile) => {
    const { flagged, displayed } = tiles;
    let data = {}
    if(valueAt(displayed, row, column)) {
        if(valueAt(mines, row, column)) {
            if(lastClickedTile.row === row && lastClickedTile.column === column && isLoseState) {
                data.status = 'displayRedBomb';
            } else {
                data.status = 'displayBomb';
            }
        } else {
            data.status = 'displayCount';
        }
    } else {
        if(valueAt(flagged, row, column)) {
            data.status = 'flagged';
            if(!valueAt(mines, row, column) && isLoseState) {
                data.status = 'displayFalseFlag'
            }
        } else if(valueAt(mines, row, column) && isLoseState) {
                data.status = 'displayBomb';
        } else {
            data.status = 'hidden';
        }
    }

    if(data.status === 'displayCount') {
        data.peripheralCount = peripheralCount(mines, row, column);
    }
    return data
}

const peripheralCount = (mines, i, j) => {
  let count = 0;

  if(mines[i - 1] && mines[i - 1][j]) count++
  if(mines[i + 1] && mines[i + 1][j]) count++
  if(mines[i] && mines[i][j - 1]) count++
  if(mines[i] && mines[i][j + 1]) count++
  if(mines[i - 1] && mines[i - 1][j - 1]) count++
  if(mines[i - 1] && mines[i - 1][j + 1]) count++
  if(mines[i + 1] && mines[i + 1][j - 1]) count++
  if(mines[i + 1] && mines[i + 1][j + 1]) count++

  return count;
}

const getClassName = (data) => {
    if(data.status === 'hidden' || data.status === 'flagged') {
        return 'hide'
    } else {
        return 'display'
    }
}

const getValue = (data) => {
    const { status, peripheralCount } = data;
    if(status === 'flagged') return '⛳️';
    if(status === 'displayBomb' || status === 'displayRedBomb') return '💣';
    if(status === 'displayCount') return peripheralCount ? peripheralCount : '';
    if(status === 'displayFalseFlag') return '🚫';
    if(status === 'hidden') return '';
}

const valueAt = (object, i, j) =>  Boolean(object[i] && object[i][j]);

Tile.propTypes = {
  index: PropTypes.array.isRequired,
};
