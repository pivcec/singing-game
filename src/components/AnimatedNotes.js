import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import * as Obj from './helpers/pixiClasses';
import { Rectangle, Line } from './helpers/pixiClasses';
const PIXI = require('pixi.js');

class AnimatedNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    this.pixiInit();
  }
  checkNoteTimeScope = (rectangleBeginning, rectangleEnd, linePosition, rectangle) => {
    if (rectangleBeginning <= linePosition && rectangleEnd >= linePosition) {
      // check if notes match
      if (this.props.noteIsMatched === true) {
        rectangle.tint = 0xFF0000;
      } else {
        rectangle.tint = 0xFFFF00;
      }
    } else {
      rectangle.tint = 0xFFFF00;
    }
  }
  pixiInit = () => {
    var VELOCITY = 100;
    const stage = new PIXI.Container();
    const renderer = PIXI.autoDetectRenderer(
      600,
      400,
      {view : this.theCanvas}
    );

    const rectangle = new Rectangle();
    stage.addChild(rectangle);

    const line = new Line([200, 150, 0, 0], 1, 0, 1, 400);
    stage.addChild(line);

    let lastTime = new Date().getTime();

    let rectangleBeginning;
    let rectangleEnd;
    const linePosition = 0;

    const update = () => {
      const currentTime = new Date().getTime();
      const delta = (currentTime-lastTime)/1000;
      rectangle.position.x -= VELOCITY*delta;
      // update rectangle position
      rectangleBeginning = rectangle.position.x;
      rectangleEnd = rectangleBeginning + rectangle.width;
      // check if line is within rectangle
      this.checkNoteTimeScope(rectangleBeginning, rectangleEnd, linePosition, rectangle);
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
};
