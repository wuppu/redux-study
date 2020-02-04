import React from 'react';
import PropTypes from 'prop-types';

import './Buttons.css';

function Buttons({onCreate, onRemove}) {
    return (
        <div className="Buttons">
            <div className="btn create" onClick={onCreate}>Create</div>
            <div className="btn remove" onClick={onRemove}>Revmoe</div>
        </div>
    );
}

Buttons.propTypes = {
    onCreate: PropTypes.func,
    onRemove: PropTypes.func
};

Buttons.defaultProps = {
    onCreate: () => console.warn(`onCreate not defined`),
    onRemove: () => console.warn(`onRemove not defined`)
}

export default Buttons;