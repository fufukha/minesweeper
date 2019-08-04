import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initializeBoard } from '../../actions/boardActions';
import {
    releaseTile as releaseTileAction
} from '../../actions/tileActions';
import Timer from '../Timer/Timer';
import Face from '../Face/Face';
import FlagCounter from '../FlagCounter/FlagCounter';
import Tile from '../Tile/Tile';
import './app.css';

const App = () => {
    const dispatch = useDispatch();
    const board = useSelector(state => state.board);
    const releaseTile = () => dispatch(releaseTileAction());
    const { rows, columns } = board;

    const tiles = [...Array(rows)]
		.map((row, i) => [...Array(columns)]
			.map((column, j) => {
                return (
                    <Tile
                        key={10*i +j}
                        index={[i, j]} />
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
        <FlagCounter />
        <div className='tilesBoard_default'>{tiles}</div>
      </div>
    );
}

export default App;
