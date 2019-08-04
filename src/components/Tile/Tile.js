import React from 'react';
import PropTypes from "prop-types";
import './tile.css';
import classnames from 'classnames';

const Tile = ({ data, onClick, onRightClick, onMouseDown, onMouseUp, isDisabled }) => {
    const handleOnClick = (e) => {
        e.preventDefault();
        !isDisabled && data.status === 'hidden' && onClick();
    }

    const handleOnRightClick = (e) => {
        e.preventDefault();
        !isDisabled && onRightClick();
    }

    const handleOnMouseDown = (e) => {
        e.preventDefault();
        onMouseDown();
    }

    return  (
        <div
            className={classnames('tile', getClassName(data), {red: data.status === 'displayRedBomb'})}
            onClick={handleOnClick}
            onContextMenu={handleOnRightClick}
            onMouseDown={handleOnMouseDown}
            onMouseUp={onMouseUp}>
            {getValue(data)}
        </div>
    )
}

const getClassName = (data) => {
    if(data.status === 'hidden' || data.status === 'flagged') {
        return 'hide'
    } else {
        return 'display'
    }
}

const getValue = (data) => {
    const { status, peripheralCount } = data;
    if(status === 'flagged') return '⛳️';
    if(status === 'displayBomb' || status === 'displayRedBomb') return '💣';
    if(status === 'displayCount') return peripheralCount ? peripheralCount : '';
    if(status === 'displayFalseFlag') return '🚫';
    if(status === 'hidden') return '';
}

export default Tile;

Tile.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onRightClick: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired
};
