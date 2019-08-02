import React from "react";
import PropTypes from 'prop-types';

const Face = ({ icon }) => {
    return (
        <div>{icon}</div>
    )
};

export default Face;

Face.propTypes = {
  icon: PropTypes.func.isRequired
}
