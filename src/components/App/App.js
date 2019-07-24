import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { configureBoard } from '../../actions/boardActions';

const App = () => {
    const dispatch = useDispatch();
    useEffect( () => {
        dispatch(configureBoard());
    }, [])

    return (
      <div>
      </div>
    );
}

export default App;
