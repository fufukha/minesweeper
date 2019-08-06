import React from 'react';
import { useDispatch } from 'react-redux';
import { releaseTile as releaseTileAction } from '../../actions/tileActions';
import Scoreboard from '../Scoreboard/Scoreboard';
import Grid from '../Grid/Grid';
import styles from './app.css';

const App = () => {
  const dispatch = useDispatch();
  const releaseTile = () => dispatch(releaseTileAction());

  return (
    <div
      className={styles.container}
      onMouseUp={releaseTile}>
      <Scoreboard />
      <Grid />
    </div>
  );
}

export default App;
