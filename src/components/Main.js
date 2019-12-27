import React, { Component, Fragment } from "react";
import _ from "lodash";
import _getUserMedia from "getusermedia";
import PitchDetect from "pitch-detect";
import Controls from "./Controls";
import ScrollingNotes from "./ScrollingNotes";
import Keyboard from "./Keyboard";
import { Stage } from "@inlet/react-pixi";
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

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      currentNoteToDetect: {},
      currentlyDetectedNoteNumber: null,
      notesThatHaveBeenDetected: []
    };
    this.throttledProcessAudio = _.throttle(this.processAudio, 100);
    this.lastFiveDetectedNoteNumbers = [];
  }

  componentDidMount() {
    this.getUserMedia();
  }

  updateLastFiveDetectedNoteNumbers = (type, noteNumber) => {
    if (type === "confident") {
      if (this.lastFiveDetectedNoteNumbers.length < 5) {
        this.lastFiveDetectedNoteNumbers.unshift(noteNumber);
      } else if (this.lastFiveDetectedNoteNumbers.length >= 5) {
        this.lastFiveDetectedNoteNumbers.pop();
        this.lastFiveDetectedNoteNumbers.unshift(noteNumber);
      }
    } else {
      this.lastFiveDetectedNoteNumbers = [];
    }
  };

  getLastFiveAreEqual = () => {
    if (this.lastFiveDetectedNoteNumbers.length === 5) {
      return this.lastFiveDetectedNoteNumbers.every(
        (val, i, arr) => val === arr[0]
      );
    }
    return false;
  };

  processAudio = pitchDetect => {
    const frequencyData = pitchDetect.getPitch();
    const { type, noteNumber } = frequencyData;
    this.updateLastFiveDetectedNoteNumbers(type, noteNumber);
    const lastFiveAreEqual = this.getLastFiveAreEqual();

    if (lastFiveAreEqual) {
      this.setState({
        currentlyDetectedNoteNumber: noteNumber
      });
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
    } catch (e) {
      console.error("Failed", e);
    }
  }

  handleToggleStart = () => {
    const { isPlaying } = this.state;
    this.setState({
      isPlaying: !isPlaying,
      currentNoteToDetect: notesToRender[0]
    });
  };

  render() {
    const { isPlaying } = this.state;
    const noteRange = config.noteRange;
    const firstNote = noteRange[0];
    const lastNote = noteRange[1];
    const numberOfNotes = firstNote - lastNote + 1;
    const stageHeight = numberOfNotes * 20;
    const {
      currentlyDetectedNoteNumber,
      currentNoteToDetect: { noteNumber, position }
    } = this.state;
    return (
      <Fragment>
        <NoteData>
          <div>{`Current note number to detect: ${noteNumber}`}</div>
          <div>{`Position of current note to detect: ${position}`}</div>
          <div>{`Currently detected note number ${currentlyDetectedNoteNumber}`}</div>
        </NoteData>
        <Controls
          handleToggleStart={this.handleToggleStart}
          isPlaying={isPlaying}
        />
        <KeyboardAndAnimation>
          <Keyboard
            firstNote={firstNote}
            lastNote={lastNote}
            currentlyDetectedNoteNumber={currentlyDetectedNoteNumber}
          />
          <div>
            <Stage height={stageHeight}>
              <ScrollingNotes
                notesToRender={notesToRender}
                handleToggleStart={this.handleToggleStart}
                isPlaying={isPlaying}
                currentlyDetectedNoteNumber={currentlyDetectedNoteNumber}
              />
            </Stage>
          </div>
        </KeyboardAndAnimation>
      </Fragment>
    );
  }
}

export default Main;
