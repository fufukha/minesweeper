import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { initializeBoard } from '../../actions/boardActions';
import { toggleFlag as toggleFlagAction, displayTile as displayTileAction } from '../../actions/tileActions';
import { startGame as startGameAction } from '../../actions/statusActions';
import Timer from '../Timer/Timer';
import FlagCounter from '../FlagCounter/FlagCounter';
import Tile from '../Tile/Tile';
import './app.css';

const App = () => {
    const dispatch = useDispatch();
    const startTime = useSelector(state => state.status.startTime);
    const isRunning = useSelector(state => state.status.isRunning);
    const flagged = useSelector(state => state.tiles.flagged);
    const mines = useSelector(state => state.board.mines);
    const board = useSelector(state => state.board);

    const toggleFlag = useCallback(
        (row, column) => dispatch(toggleFlagAction(row, column)),
        [dispatch]
    );

    const displayTile = useCallback(
        (row, column) => dispatch(displayTileAction(row, column)),
        [dispatch]
    );

    const startGame = useCallback(
        () => dispatch(startGameAction()),
        [dispatch]
    );

    const { rows, columns } = board;
    const tiles = [...Array(rows)]
		.map((row, i) => [...Array(columns)]
			.map((column, j) => <Tile
                key={i*10 + j}
                row={i}
                column={j}
                mines={mines}
                isRunning={isRunning}
                startGame={startGame}
                toggleFlag={toggleFlag}
                displayTile={displayTile} />
            )
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
