import React from 'react';
import PropTypes from "prop-types";
import './tile.css';

const Tile = ({ data, onClick, onRightClick, isDisabled }) => {
    const handleOnClick = (e) => {
        e.preventDefault();
        !isDisabled && onClick();
    }

    const handleOnRightClick = (e) => {
        e.preventDefault();
        !isDisabled && onRightClick();
    }

    return  (
        <div
            className={`tile ${getClassName(data)}`}
            onClick={handleOnClick}
            onContextMenu={handleOnRightClick}>
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
    if(status === 'displayBomb') return '💣';
    if(status === 'displayCount') return peripheralCount ? peripheralCount : '';
    if(status === 'displayFalseFlag') return '🚫';
    if(status === 'hidden') return '';
}

export default Tile;

Tile.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onRightClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired
};
