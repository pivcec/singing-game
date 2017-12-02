import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import * as Obj from './helpers/pixiClasses';
import { Rectangle, Line } from '../helpers/pixiClasses';
import notesToRender from '../resources/notesToRender';
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
    };
  }

  componentWillMount() {
    this.getOriginalStartAndEndPositionXOfNoteToDetect();
    this.getNumberOfNotes();
    this.getNoteNumberToMatch();
  }

  getNoteNumberToMatch = () => {
    const { keyOfNoteToDetect } = this.state;
    const noteNumberToMatch = notesToRender[keyOfNoteToDetect].noteNumber;
    const { updateNoteNumberToMatch } = this.props;
    updateNoteNumberToMatch(noteNumberToMatch);
  };

  getOriginalStartAndEndPositionXOfNoteToDetect = () => {
    const { keyOfNoteToDetect } = this.state;
    const originalStartPositionXOfNoteToDetect = notesToRender[keyOfNoteToDetect].positionX;
    const originalEndPositionXOfNoteToDetect = originalStartPositionXOfNoteToDetect + notesToRender[keyOfNoteToDetect].width;
    this.setState({
      originalStartPositionXOfNoteToDetect,
      originalEndPositionXOfNoteToDetect,
    });
  };

  getNumberOfNotes = () => {
    this.setState({
      numberOfNotes: notesToRender.length,
    });
  };

  componentDidMount() {
    this.pixiInit();
  }

  renderSprites = (texture, notes) => {
    notesToRender.forEach((note, i) => {
      window['note'+i] = new PIXI.Sprite(texture);
      window['note'+i].width = note.width;
      window['note'+i].position.x = note.positionX;
      window['note'+i].position.y = note.positionY;
      window['note'+i].interactive = true;
      window['note'+i].hitArea = new PIXI.Rectangle(0, 0, note.width, 10);
      notes.addChild(window['note'+i]);
    });
  };

  createAndStageNotes = (stage, renderer) => {
    // create rectangle primitive and texture
    const note = new Rectangle(1000);
    const texture = new PIXI.RenderTexture(renderer);
    renderer.render(note, texture)
    // create group of rectangles
    const notes = new PIXI.Container();
    // render rectangle sprites and add them to rectangles group
    this.renderSprites(texture, notes);
    // add rectangles group to stage
    stage.addChild(notes);
    // return rectangles group
    return notes;
  };

  setNoteToDetectBounds = (notes, amountOfMovement) => {
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
  };

  checkFrequencyToMatch = (startPositionXOfNoteToDetect, endPositionXOfNoteToDetect, linePositionX, note) => {
    const { noteIsMatched } = this.props;
    if (startPositionXOfNoteToDetect <= linePositionX && endPositionXOfNoteToDetect >= linePositionX) {
      // check if note is matched
      if (noteIsMatched === true) {
        note.tint = 0xFF0000;
      } else {
        note.tint = 0xFFFF00;
      }
    } else {
      note.tint = 0xFFFF00;
    }
  };

  checkForCollisionOfNoteToDetect(linePositionX, notes) {
    const { startPositionXOfNoteToDetect, endPositionXOfNoteToDetect, noteToDetectIsColliding, keyOfNoteToDetect, numberOfNotes } = this.state;
    const keyOfNoteToDetectPlusOne = keyOfNoteToDetect + 1;
    const note = notes.children[keyOfNoteToDetect];
    if (startPositionXOfNoteToDetect <= linePositionX && endPositionXOfNoteToDetect >= linePositionX) {
      // note to detect is colliding
      this.checkFrequencyToMatch(startPositionXOfNoteToDetect, endPositionXOfNoteToDetect, linePositionX, note);
      this.setState({
        noteToDetectIsColliding: true,
      });
    } else {
      // note to detect is not colliding
      if (noteToDetectIsColliding === true) {
        this.setState({
          noteToDetectIsColliding: false,
          keyOfNoteToDetect: keyOfNoteToDetectPlusOne,
        });
        if (keyOfNoteToDetectPlusOne < numberOfNotes) {
          this.getNoteNumberToMatch();
          this.getOriginalStartAndEndPositionXOfNoteToDetect();
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
    // create line
    const linePositionX = 10;
    const line = new Line([200, 150, 0, 0], linePositionX, 0, linePositionX, 400);
    stage.addChild(line);
    // create and stage notes
    const notes = this.createAndStageNotes(stage, renderer);
    // create animation update variables
    let lastTime = new Date().getTime();

    const update = () => {
      const currentTime = new Date().getTime();
      const delta = (currentTime-lastTime)/1000;
      const amountOfMovement = VELOCITY*delta;
      // update notes start position x
      notes.position.x -= amountOfMovement;
      // set bounds of note to detect
      this.setNoteToDetectBounds(notes, amountOfMovement);
      // check if note to detect is within position / time scope
      this.checkForCollisionOfNoteToDetect(linePositionX, notes);
      // update animation
      renderer.render(stage);
      requestAnimationFrame(update);
      lastTime = currentTime;
    };

    requestAnimationFrame(update);
  };

  render() {
    return (
      <div className={"animated-notes"}>
        <canvas ref={ theCanvas => this.theCanvas = theCanvas} />
      </div>
    );
  }
}

export default AnimatedNotes;

AnimatedNotes.propTypes = {
  noteIsMatched: PropTypes.bool.isRequired,
  updateNoteNumberToMatch: PropTypes.func.isRequired,
};
