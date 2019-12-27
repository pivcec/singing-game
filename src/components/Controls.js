import React from "react";
import PropTypes from "prop-types";
const Controls = props => {
  const { isPlaying, handleToggleStart } = props;
  return (
    <div>
      <button onClick={handleToggleStart}>
        {isPlaying ? "restart" : "start"}
      </button>
    </div>
  );
};

export default Controls;

Controls.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  handleToggleStart: PropTypes.func.isRequired
};
