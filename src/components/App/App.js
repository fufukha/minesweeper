import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initializeBoard } from '../../actions/boardActions';
import { releaseTile as releaseTileAction } from '../../actions/tileActions';
import Timer from '../Timer/Timer';
import Face from '../Face/Face';
import FlagCounter from '../FlagCounter/FlagCounter';
import Tile from '../Tile/Tile';
import styles from './app.css';

const App = () => {
  const dispatch = useDispatch();
  const { rows, columns } = useSelector(state => state.board);
  const releaseTile = () => dispatch(releaseTileAction());
  const tiles = [...Array(rows)]
    .map((row, i) => [...Array(columns)]
      .map((column, j) => {
        return (
          <Tile
            key={10*i +j}
            index={[i, j]} />
        );
      })
    );

  useEffect(() => {
    dispatch(initializeBoard());
  }, [dispatch]);

  return (
    <div onMouseUp={releaseTile}>
      <Timer/>
      <Face />
      <FlagCounter />
      <div className={styles.tilesBoard_default}>{tiles}</div>
    </div>
  );
}

export default App;
