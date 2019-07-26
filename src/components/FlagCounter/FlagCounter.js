import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const FlagCounter = ({ flags, mines }) => {
    const numberMinesText = threeDigitStr(mines)
    const [ flagCounterText, setFlagCounterText ] = useState(numberMinesText);

    useEffect(() => {
        const flagCount = mines - numberObjectKeys(flags);
        const text = threeDigitStr(flagCount);
        setFlagCounterText(text)
    }, [flags, mines])

    return (
    <div className='scoreBoard-numbers'>888
      <div>{flagCounterText}</div>
    </div>
    );
}

const numberObjectKeys = object => {
    let numberOfKeys = 0;
    for (var key in object) {
				numberOfKeys+= Object.keys(object[key]).length;
    }
		return numberOfKeys
}

const threeDigitStr = number => {
    if(number < 0 && number > -100) {
        const text = '-' + Math.abs(number).toString().padStart(2,0);
        return text;
    } else if ( number < -99) {
        return '-99';
    } else if (number > 0 && number < 1000) {
        const text = number.toString().padStart(3,0);
        return text;
    } else if (number > 999) {
        return '999'
    }
}

 FlagCounter.propTypes = {
   flags: PropTypes.object.isRequired,
   mines: PropTypes.number.isRequired
};

export default FlagCounter;
