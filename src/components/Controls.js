import React from "react";
import PropTypes from "prop-types";
const Controls = props => {
  const { isPlaying, handleEndAnimation, handleStartAnimation } = props;
  return (
    <div>
      {isPlaying && <button onClick={handleEndAnimation}>end</button>}
      {!isPlaying && <button onClick={handleStartAnimation}>start</button>}
    </div>
  );
};

export default Controls;

Controls.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  handleStartAnimation: PropTypes.func.isRequired,
  handleEndAnimation: PropTypes.func.isRequired
};
