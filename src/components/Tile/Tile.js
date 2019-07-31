import React from 'react';
import PropTypes from "prop-types";
import './tile.css';

const Tile = ({ data, onClick, onRightClick }) => {
    return  (
        <div
            className={`tile ${getClassName(data)}`}
            onClick={onClick}
            onContextMenu={onRightClick}>
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
    if(status === 'displayCount') return peripheralCount;
    if(status === 'hidden') return '';
}

export default Tile;

Tile.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onRightClick: PropTypes.func.isRequired,
};
