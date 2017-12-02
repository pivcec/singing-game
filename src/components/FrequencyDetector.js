import React, { Component } from 'react';
import Keyboard from './Keyboard';
import AnimatedNotes from './AnimatedNotes';
import _getUserMedia from 'getusermedia';
import PitchDetect from 'pitch-detect';
import _ from 'lodash';

const getUserMedia = () =>
  new Promise((resolve, reject) =>
    _getUserMedia((err, stream) =>
      err ? reject(err) : resolve(stream)));

class FrequencyDetector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frequencyData: {},
      noteNumberToMatch: null,
      noteIsMatched: false,
    };
    this.throttledProcessAudio = _.throttle(this.processAudio, 30);
  }

  componentDidMount() {
    this.getUserMedia();
  }

  updateNoteNumberToMatch = (noteNumberToMatch) => {
    this.setState({
      noteNumberToMatch,
    });
  };

  processAudio = (pitchDetect) => {
    const frequencyData = pitchDetect.getPitch();
    const { noteNumberToMatch } = this.state;
    // console.log(frequencyData);
    if (frequencyData.noteNumber === noteNumberToMatch) {
      this.setState({
        noteIsMatched: true,
      });
    } else {
      this.setState({
        noteIsMatched: false,
      });
    }
    this.setState({
      frequencyData: frequencyData,
    });
    this.throttledProcessAudio(pitchDetect);
  };
  async getUserMedia() {
    try {
      const stream = await getUserMedia();
      const pitchDetect = new PitchDetect(stream);
      /*
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const frameCount = audioCtx.sampleRate * 2.0;
      const myArrayBuffer = audioCtx.createBuffer(1, frameCount, audioCtx.sampleRate);
      console.log(myArrayBuffer);
      */
      this.processAudio(pitchDetect);
    } catch (e) {
      console.error('Failed', e);
    }

  };

  render() {
    const {
      frequencyData,
      noteIsMatched,
    } = this.state;
    const { noteNumber } = frequencyData;
    return (
      <div className="main">
        <div>Frequency in Hz: {frequencyData.pitch}</div>
        <div>Note Number: {frequencyData.noteNumber}</div>
        <div>Note: {frequencyData.note}</div>
        <div className={"container"}>
          <Keyboard noteNumber={noteNumber} />
          <AnimatedNotes
            noteIsMatched={noteIsMatched}
            updateNoteNumberToMatch={(noteNumberToMatch) => {this.updateNoteNumberToMatch(noteNumberToMatch)}}
          />
        </div>
      </div>
    );
  }
}

export default FrequencyDetector;
