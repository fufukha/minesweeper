import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { initializeBoard } from '../../actions/boardActions';
import { toggleFlag as toggleFlagAction, displayTile as displayTileAction } from '../../actions/tileActions';
import Timer from '../Timer/Timer';
import FlagCounter from '../FlagCounter/FlagCounter';
import Tile from '../Tile/Tile';
import './app.css';

const App = () => {
    const dispatch = useDispatch();
    const { startTime, isRunning } = useSelector(state => state.status);
    const { flagged, displayed } = useSelector(state => state.tiles);
    const mines = useSelector(state => state.board.mines);
    const board = useSelector(state => state.board);

    const { rows, columns } = board;
    const tiles = [...Array(rows)]
		.map((row, i) => [...Array(columns)]
			.map((column, j) => {
                const toggleFlag = (e) => {
                    e.preventDefault();
                    dispatch(toggleFlagAction(i, j));
                }
                const displayTile = (e) => {
                    e.preventDefault();
                    dispatch(displayTileAction(i, j));
                }

                return (
                    <Tile
                        key={i*10 + j}
                        data={getData(mines, flagged, displayed, i, j)}
                        onClick={displayTile}
                        onRightClick={toggleFlag} />
                )
            })
        )

    useEffect( () => {
        dispatch(initializeBoard());
    }, [dispatch]);

    return (
      <div>
        <Timer
            startTime={startTime}
            isRunning={isRunning}/>
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

const getData = (mines, flagged, displayed, row, column) => {
    let data = {}
    if(displayed[row] && displayed[row][column]) {
        if(mines[row] && mines[row][column]) {
            data.status = 'displayBomb';
        } else {
            data.status = 'displayCount';
        }
    } else {
        if(flagged[row] && flagged[row][column]) {
            data.status = 'flagged';
        } else {
            data.status = 'hidden';
        }
    }

    if(data.status === 'displayCount') {
        data.peripheralCount = peripheralCount(mines, row, column);
    }
    return data
}
