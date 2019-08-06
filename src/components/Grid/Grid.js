import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initializeGame } from '../../actions/boardActions';
import Tile from '../Tile/Tile';
import styles from './grid.css';

const Grid = () => {
  const dispatch = useDispatch();
  const { rows, columns } = useSelector(state => state.board);
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
    dispatch(initializeGame());
  }, [dispatch]);

  return (
    <div
      className={styles.tilesBoard_default}
      style={
        {
          'gridTemplateRows': `repeat(${rows}, 1fr)`,
          'gridTemplateColumns': `repeat(${columns}, 1fr)`
        }
      }>
      {tiles}
    </div>
  );
}

export default Grid;
