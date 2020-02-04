import React from "react";
import PropTypes from "prop-types";
import "./Counter.css";

function Counter({
  number,
  color,
  index,
  onIncrement,
  onDecrement,
  onSetColor
}) {
  return (
    <div
      className="counter"
      onClick={() => onIncrement(index)}
      onContextMenu={e => {
        e.preventDefault();
        onDecrement(index);
      }}
      onDoubleClick={() => onSetColor(index)}
      style={{
        background: color
      }}
    >
      {number}
    </div>
  );
}

Counter.prototype = {
  index: PropTypes.number,
  number: PropTypes.number,
  color: PropTypes.string,
  onIncrement: PropTypes.func,
  onDecrement: PropTypes.func,
  onSetColor: PropTypes.func
};

Counter.defaultProps = {
  index: 0,
  number: 0,
  color: "black",
  onIncrement: () => console.warn("onIncrement not defined"),
  onDecrement: () => console.warn("onDecrement not defined"),
  onSetColor: () => console.warn("onSetColor not defined")
};

export default Counter;
