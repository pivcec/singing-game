import React, { Component, Fragment } from "react";
import _ from "lodash";
import _getUserMedia from "getusermedia";
import PitchDetect from "pitch-detect";
import Controls from "./Controls";
import Keyboard from "./Keyboard";
import Animation from "./Animation";
import styled from "styled-components";
import config from "../config";
import notesToRender from "../resources/notesToRender";

const getUserMedia = () =>
  new Promise((resolve, reject) =>
    _getUserMedia((err, stream) => (err ? reject(err) : resolve(stream)))
  );

const NoteData = styled.div`
  display: flex;
  border: 1px solid #000;
  flex-direction: column;
`;

const KeyboardAndAnimation = styled.div`
  display: flex;
  flex-direction: row;
`;

const AnimationContainer = styled.div`
  width: 800px;
  height: ${props => props.height}px;
  background-color: black;
  overflow: hidden;
  position: relative;
`;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      currentlyDetectedNoteNumber: null
    };
    this.throttledProcessAudio = _.throttle(this.processAudio, 100);
  }

  componentDidMount() {
    this.getUserMedia();
  }

  processAudio = pitchDetect => {
    const frequencyData = pitchDetect.getPitch();
    const { type, noteNumber } = frequencyData;
    if (type === "confident") {
      this.setState({ currentlyDetectedNoteNumber: noteNumber });
    } else {
      this.setState({ currentlyDetectedNoteNumber: null });
    }

    this.throttledProcessAudio(pitchDetect);
  };

  async getUserMedia() {
    try {
      const stream = await getUserMedia();
      const pitchDetect = new PitchDetect(stream);
      this.processAudio(pitchDetect);
    } catch (error) {
      console.error("failed to get user media", error);
    }
  }

  handleStartAnimation = () => {
    this.setState({
      isPlaying: true
    });
  };

  handleEndAnimation = () => {
    this.setState({
      isPlaying: false
    });
  };

  render() {
    const { isPlaying } = this.state;
    const keyRange = config.keyRange;
    const firstKey = keyRange[0];
    const lastKey = keyRange[1];
    const numberOfKeys = lastKey - firstKey + 1;
    const animationContainerWidth = config.animationContainerWidth;
    const animationContainerHeight = numberOfKeys * 20;
    const lastNote = notesToRender[notesToRender.length - 1];
    const animationWidth = (lastNote.position + lastNote.length) * 100;
    const { currentlyDetectedNoteNumber } = this.state;
    return (
      <Fragment>
        <NoteData>
          <div>{`Currently detected note number ${currentlyDetectedNoteNumber}`}</div>
        </NoteData>
        <Controls
          handleStartAnimation={this.handleStartAnimation}
          handleEndAnimation={this.handleEndAnimation}
          isPlaying={isPlaying}
        />
        <KeyboardAndAnimation>
          <Keyboard
            firstKey={firstKey}
            lastKey={lastKey}
            currentlyDetectedNoteNumber={currentlyDetectedNoteNumber}
          />
          <AnimationContainer height={animationContainerHeight}>
            <Animation
              handleStartAnimation={this.handleStartAnimation}
              handleEndAnimation={this.handleEndAnimation}
              animationContainerWidth={animationContainerWidth}
              animationWidth={animationWidth}
              firstKey={firstKey}
              lastKey={lastKey}
              isPlaying={isPlaying}
              currentlyDetectedNoteNumber={currentlyDetectedNoteNumber}
            />
          </AnimationContainer>
        </KeyboardAndAnimation>
      </Fragment>
    );
  }
}

export default Main;
