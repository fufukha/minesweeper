import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { initializeBoard } from '../../actions/boardActions';
import {
    toggleFlag as toggleFlagAction,
    displayTile as displayTileAction,
    pressTile as pressTileAction,
    releaseTile as releaseTileAction
} from '../../actions/tileActions';
import isWinStateSelector from '../../selectors/isWinState';
import isLoseStateSelector from '../../selectors/isLoseState';
import Timer from '../Timer/Timer';
import Face from '../Face/Face';
import FlagCounter from '../FlagCounter/FlagCounter';
import Tile from '../Tile/Tile';
import './app.css';

const App = () => {
    const dispatch = useDispatch();
    const { flagged, displayed } = useSelector(state => state.tiles);
    const mines = useSelector(state => state.board.mines);
    const board = useSelector(state => state.board);
    const lastClickedTile = useSelector(state => state.lastClickedTile);
    const pressTile = () => dispatch(pressTileAction());
    const releaseTile = () => dispatch(releaseTileAction());
    const { rows, columns } = board;
    const isWinState = useSelector(isWinStateSelector);
    const isLoseState = useSelector(isLoseStateSelector);

    const tiles = [...Array(rows)]
		.map((row, i) => [...Array(columns)]
			.map((column, j) => {
                const toggleFlag = () => {
                    dispatch(toggleFlagAction(i, j));
                }
                const displayTile = () => {
                    dispatch(displayTileAction(i, j));
                }

                return (
                    <Tile
                        key={i*10 + j}
                        data={getData(mines, flagged, displayed, i, j, isLoseState, lastClickedTile)}
                        onClick={displayTile}
                        onRightClick={toggleFlag}
                        onMouseDown={pressTile}
                        onMouseUp={releaseTile}
                        isDisabled={isWinState || isLoseState} />
                )
            })
        )

    useEffect( () => {
        dispatch(initializeBoard());
    }, [dispatch]);

    return (
      <div onMouseUp={releaseTile}>
        <Timer/>
        <Face />
        <FlagCounter
            flags={flagged}
            mines={mines}/>
        <div className='tilesBoard_default'>{tiles}</div>
      </div>
    );
}

export default App;

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

const getData = (mines, flagged, displayed, row, column, isLoseState, lastClickedTile) => {
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

const valueAt = (object, i, j) =>  Boolean(object[i] && object[i][j]);
