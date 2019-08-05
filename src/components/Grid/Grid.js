import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initializeBoard } from '../../actions/boardActions';
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
    dispatch(initializeBoard());
  }, [dispatch]);

  return (
    <div
      className={styles.tilesBoard_default}
      style={
        {
          'grid-template-rows': `repeat(${rows}, 1fr)`,
          'grid-template-columns': `repeat(${columns}, 1fr)`
        }
      }>
      {tiles}
    </div>
  );
}

export default Grid;
