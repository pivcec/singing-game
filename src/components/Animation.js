import React, { Component } from "react";
import Row from "./Row";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import keys from "../resources/keys";
import notesToRender from "../resources/notesToRender";

const AnimatedTable = styled.div`
  position: absolute;
  width: ${props => props.width}px;
  animation: ${props => props.animation};
  animation-duration: 50s;
  animation-timing-function: linear;
`;

class Animation extends Component {
  state = {
    currentNoteToDetect: {},
    notesThatHaveBeenDetected: [],
    currentAnimatedTableOffsetLeft: null
  };

  animatedTable = React.createRef();

  componentDidUpdate(prevProps) {
    const { isPlaying } = prevProps;

    if (!isPlaying && this.props.isPlaying) {
      this.setState({ currentNoteToDetect: notesToRender[0] });
      this.animatedTable.current.style.display = "block";
    }
  }

  handleEndAnimation = () => {
    this.setState({ currentNoteToDetect: [] });
    this.animatedTable.current.style.display = "none";
    this.props.handleEndAnimation();
  };

  render() {
    const {
      animationContainerWidth,
      animationWidth,
      firstKey,
      lastKey,
      isPlaying,
      currentlyDetectedNoteNumber
    } = this.props;

    const animation = () => keyframes`
      from { 
        left: ${animationContainerWidth}px 
      } 
      to { 
        left: ${isPlaying ? -animationWidth : animationContainerWidth}px;
      }
    `;

    return (
      <AnimatedTable
        ref={this.animatedTable}
        animation={animation}
        onAnimationEnd={this.handleEndAnimation}
      >
        {keys.map((key, i) => {
          if (key.noteNumber >= firstKey && key.noteNumber <= lastKey) {
            return (
              <Row
                key={key.noteNumber}
                noteNumberOfRow={key.noteNumber}
                currentlyDetectedNoteNumber={currentlyDetectedNoteNumber}
              />
            );
          }
        })}
      </AnimatedTable>
    );
  }
}

export default Animation;

Animation.propTypes = {
  handleStartAnimation: PropTypes.func.isRequired,
  handleEndAnimation: PropTypes.func.isRequired,
  animationContainerWidth: PropTypes.number.isRequired,
  animationWidth: PropTypes.number.isRequired,
  firstKey: PropTypes.number.isRequired,
  lastKey: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  currentlyDetectedNoteNumber: PropTypes.number
};
