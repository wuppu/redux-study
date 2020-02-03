import React from "react";
import PropTypes from "prop-types";
import "./Counter.css";

function Counter({ number, color, onIncrement, onDecrement, onSetColor }) {
  return (
    <div
      className="counter"
      onClick={onIncrement}
      onContextMenu={e => {
        e.preventDefault();
        onDecrement();
      }}
      onDoubleClick={onSetColor}
      style={{
          background: color
      }}
    >
        {number}
    </div>
  );
}

Counter.prototype = {
    number: PropTypes.number,
    color: PropTypes.string,
    onIncrement: PropTypes.func,
    onDecrement: PropTypes.func,
    onSetColor: PropTypes.func
};

Counter.defaultProps = {
    number: 0,
    color: "black",
    onIncrement: () => console.warn("onIncrement not defined"),
    onDecrement: () => console.warn("onDecrement not defined"),
    onSetColor: () => console.warn("onSetColor not defined")
};

export default Counter;