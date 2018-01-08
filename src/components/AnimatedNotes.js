import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lyrics from './Lyrics';
import { Rectangle, Line } from '../helpers/pixiClasses';
import notesToRender from '../resources/notes/notesToRender';
const PIXI = require('pixi.js');

class AnimatedNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyOfNoteToDetect: 0,
      originalStartPositionXOfNoteToDetect: null,
      originalEndPositionXOfNoteToDetect: null,
      numberOfNotes: null,
      startPositionXOfNoteToDetect: null,
      endPositionXOfNoteToDetect: null,
      startPositionXOfNotes: null,
      noteToDetectIsColliding: false,
      countAnimatedGroupMovementMultiplesOf400: 0,
      bar: 0,
    };
  }

  componentWillMount() {
    this.setOriginalStartAndEndPositionXOfNoteToDetect();
    this.setNumberOfNotes();
    this.setNoteNumberToMatch();
  }

  componentDidMount() {
    this.pixiInit();
  }

  setNoteNumberToMatch = () => {
    const { keyOfNoteToDetect } = this.state;
    const noteNumberToMatch = notesToRender[keyOfNoteToDetect].noteNumber;
    const { updateNoteNumberToMatch } = this.props;
    updateNoteNumberToMatch(noteNumberToMatch);
  };

  setOriginalStartAndEndPositionXOfNoteToDetect = () => {
    const { keyOfNoteToDetect } = this.state;
    const originalStartPositionXOfNoteToDetect = notesToRender[keyOfNoteToDetect].positionX;
    const originalEndPositionXOfNoteToDetect = originalStartPositionXOfNoteToDetect + notesToRender[keyOfNoteToDetect].width;
    this.setState({
      originalStartPositionXOfNoteToDetect,
      originalEndPositionXOfNoteToDetect,
    });
  };

  setNumberOfNotes = () => {
    this.setState({
      numberOfNotes: notesToRender.length,
    });
  };

  renderSprites = (texture, notes) => {
    notesToRender.forEach((note, i) => {
      window['note'+i] = new PIXI.Sprite(texture);
      window['note'+i].width = note.width;
      window['note'+i].position.x = note.positionX;
      window['note'+i].position.y = note.positionY;
      window['note'+i].interactive = true;
      notes.addChild(window['note'+i]);
    });
  };

  renderBarLines = (texture, notes) => {
    let totalNoteLength = 0;
    notesToRender.forEach((note, i) => {
      totalNoteLength = totalNoteLength + note.width + 3;
      if (totalNoteLength % 400 === 0) {
        window['barLine'+i] = new PIXI.Sprite(texture);
        window['barLine'+i].position.x = note.totalNoteLength;
        window['barLine'+i] = new Line([200, 150, 0, 0], totalNoteLength, 0, totalNoteLength, 400, 0xFFFFFF);
        notes.addChild(window['barLine'+i]);
      }
    });
  }

  createAnimatedGroup = (stage, renderer) => {
    // create rectangle primitive and texture
    const note = new Rectangle(1000);
    const texture = new PIXI.RenderTexture(renderer);
    renderer.render(note, texture)
    // create group of notes
    const notes = new PIXI.Container();
    // render note sprites and add them to notes group
    this.renderSprites(texture, notes);
    // render bar lines and add them to notes group
    this.renderBarLines(texture, notes);
    // add notes group to stage
    stage.addChild(notes);
    // return rectangles group
    return notes;
  };

  checkAnimatedGroupMovementMultiplesOf400 = () => {
    const { startPositionXOfNotes, countAnimatedGroupMovementMultiplesOf400, bar } = this.state;
    const nextMultipleOf400 = countAnimatedGroupMovementMultiplesOf400 + 400;
    const startPositionXOfNotesToInteger = Math.round(-startPositionXOfNotes);
    if (startPositionXOfNotesToInteger > nextMultipleOf400) {
      this.setState({
        countAnimatedGroupMovementMultiplesOf400: countAnimatedGroupMovementMultiplesOf400 + 400,
        bar: bar + 1,
      })
    }
  };

  setBoundsOfNoteToDetect = (amountOfMovement) => {
    const {
      startPositionXOfNotes,
      originalStartPositionXOfNoteToDetect,
      originalEndPositionXOfNoteToDetect,
    } = this.state;
    this.setState({
      startPositionXOfNotes: startPositionXOfNotes - amountOfMovement,
      startPositionXOfNoteToDetect: originalStartPositionXOfNoteToDetect + startPositionXOfNotes,
      endPositionXOfNoteToDetect: originalEndPositionXOfNoteToDetect + startPositionXOfNotes,
    });
    this.checkAnimatedGroupMovementMultiplesOf400(startPositionXOfNotes);
  };

  checkFrequencyToMatch = (startPositionXOfNoteToDetect, endPositionXOfNoteToDetect, noteDetectionLinePositionX, note) => {
    const { noteIsMatched } = this.props;
    if (startPositionXOfNoteToDetect <= noteDetectionLinePositionX && endPositionXOfNoteToDetect >= noteDetectionLinePositionX) {
      // note is within time scope
      if (noteIsMatched === true) {
        // note is matched
        note.tint = 0xFF0000;
      } else {
        // note is not matched
        note.tint = 0xFFFF00;
      }
    } else {
      // note is not within time scope
      note.tint = 0xFFFF00;
    }
  };

  checkForCollisionOfNoteToDetect(noteDetectionLinePositionX, animatedGroup) {
    const { startPositionXOfNoteToDetect, endPositionXOfNoteToDetect, noteToDetectIsColliding, keyOfNoteToDetect, numberOfNotes } = this.state;
    const keyOfNoteToDetectPlusOne = keyOfNoteToDetect + 1;
    const note = animatedGroup.children[keyOfNoteToDetect];
    if (startPositionXOfNoteToDetect <= noteDetectionLinePositionX && endPositionXOfNoteToDetect >= noteDetectionLinePositionX) {
      // note to detect is colliding
      this.checkFrequencyToMatch(startPositionXOfNoteToDetect, endPositionXOfNoteToDetect, noteDetectionLinePositionX, note);
      this.setState({
        noteToDetectIsColliding: true,
      });
    } else {
      // note to detect is not colliding
      // correct current state, if necessary
      if (noteToDetectIsColliding === true) {
        this.setState({
          noteToDetectIsColliding: false,
          keyOfNoteToDetect: keyOfNoteToDetectPlusOne,
        });
        if (keyOfNoteToDetectPlusOne < numberOfNotes) {
          this.setNoteNumberToMatch();
          this.setOriginalStartAndEndPositionXOfNoteToDetect();
        }
      }
    }
  };

  pixiInit = () => {
    const VELOCITY = 100;
    const stage = new PIXI.Container();
    const renderer = PIXI.autoDetectRenderer(
      600,
      400,
      {view : this.theCanvas}
    );
    // create and stage notes
    const animatedGroup = this.createAnimatedGroup(stage, renderer);
    // create note detection line
    const noteDetectionLinePositionX = 10;
    const noteDetectionLine = new Line([200, 150, 0, 0], noteDetectionLinePositionX, 0, noteDetectionLinePositionX, 400, 0xFF0000);
    stage.addChild(noteDetectionLine);
    // create animation update variables
    let lastTime = new Date().getTime();

    const update = () => {
      const currentTime = new Date().getTime();
      const delta = (currentTime-lastTime)/1000;
      const amountOfMovement = VELOCITY*delta;
      animatedGroup.position.x -= amountOfMovement;
      // set bounds of note to detect
      this.setBoundsOfNoteToDetect(amountOfMovement);
      // check if note to detect is within position / time scope
      this.checkForCollisionOfNoteToDetect(noteDetectionLinePositionX, animatedGroup);
      // update animation
      renderer.render(stage);
      requestAnimationFrame(update);
      lastTime = currentTime;
    };

    requestAnimationFrame(update);
  };

  render() {
    const { keyOfNoteToDetect, bar } = this.state;
    return (
      <div className={"animated-notes"}>
        <canvas ref={ theCanvas => this.theCanvas = theCanvas} />
        <Lyrics currentNote={keyOfNoteToDetect} currentBar={bar} />
      </div>
    );
  }
}

export default AnimatedNotes;

AnimatedNotes.propTypes = {
  noteIsMatched: PropTypes.bool.isRequired,
  updateNoteNumberToMatch: PropTypes.func.isRequired,
};
