import React from 'react';
import { useDispatch } from 'react-redux';
import { releaseTile as releaseTileAction } from '../../actions/tileActions';
import Timer from '../Timer/Timer';
import Face from '../Face/Face';
import FlagCounter from '../FlagCounter/FlagCounter';
import Grid from '../Grid/Grid';

const App = () => {
  const dispatch = useDispatch();
  const releaseTile = () => dispatch(releaseTileAction());

  return (
    <div onMouseUp={releaseTile}>
      <Timer/>
      <Face />
      <FlagCounter />
      <Grid />
    </div>
  );
}

export default App;
