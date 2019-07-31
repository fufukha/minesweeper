import React, { useState } from 'react';
import PropTypes from "prop-types";
import useEffectSkipFirst from './useEffectSkipFirst';
import './tile.css';

const Tile = ({ row, column, mines, isRunning, startGame, toggleFlag, displayTile }) => {
    const [ className, setClassName ] = useState('tile hide');
    const [ isDisplayed, setIsDisplayed ] = useState(false);
    const [ isFlagged, setIsFlagged ] = useState(false);
    const [ tileValue, setTileValue ] = useState('');

    // useEffect(() =>{
    //     setIsDisplayed(displayed[row] && displayed[row][column])
    //     setIsFlagged(flagged[row] && flagged[row][column])
    // }, [column, displayed, flagged, isFlagged, isDisplayed, row])

    useEffectSkipFirst(() => {
        setTileValue(isFlagged ? '⛳️' : '')
    }, [isFlagged])

    useEffectSkipFirst(() => {
        if (isDisplayed) {
            console.log(row, column)
            if(mines[row] && mines[row][column]) {
                setTileValue('💣')
            } else {
                const value = peripheralCount(mines, row, column) || '';
                setTileValue(value);
            }
            setClassName('tile display');
        }
    }, [column, isDisplayed, mines, row])


    const handleOnClick = (event) => {
        event.preventDefault();

        if(isRunning === false) startGame();

        if(isDisplayed === true) {
            preventClick(event);
        } else {
            displayTile(row, column);
            setIsDisplayed(true);
        }
    }

    const handleOnContextMenu = (event) => {
        event.preventDefault();
        
        if(isRunning === false) startGame();

        if (isDisplayed) {
            preventClick(event)
        } else {
            toggleFlag(row, column)
            console.log(`flagged state is ${isFlagged}`)
            setIsFlagged(!isFlagged);
            isFlagged == true ? setTileValue('⛳️') : setTileValue('');
        }
    }

    return  (
        <div
            className={className}
            onClick={(e) => handleOnClick(e)}
            onContextMenu={(e) => handleOnContextMenu(e)}>
            {tileValue}
        </div>
    )
}

const preventClick = (event) => {
    event.preventDefault()
    return false
}

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

export default Tile;

Tile.propTypes = {
  row: PropTypes.number,
  column: PropTypes.number,
 // displayed: PropTypes.object.isRequired,
  mines: PropTypes.object.isRequired,
 // flagged: PropTypes.object.isRequired,
  isRunning: PropTypes.bool.isRequired,
  startGame: PropTypes.func.isRequired,
  toggleFlag: PropTypes.func.isRequired,
  displayTile: PropTypes.func.isRequired,
};
