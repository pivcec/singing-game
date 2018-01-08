import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Keyboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  getNoteClassName = (noteNumber, noteColour) => {
    if (noteNumber === this.props.noteNumber) {
      return 'note active';
    } else if (noteColour === 'white') {
      return 'note white';
    } else {
      return 'note black';
    }
  };

  render() {
    return (
      <div className={"keyboard"}>
        <ul>
          <li className={this.getNoteClassName(88, 'white')}></li>
          <li className={this.getNoteClassName(87, 'black')}></li>
          <li className={this.getNoteClassName(86, 'white')}></li>
          <li className={this.getNoteClassName(85, 'black')}></li>
          <li className={this.getNoteClassName(84, 'white')}></li>
          <li className={this.getNoteClassName(83, 'white')}></li>
          <li className={this.getNoteClassName(82, 'black')}></li>
          <li className={this.getNoteClassName(81, 'white')}></li>
          <li className={this.getNoteClassName(80, 'black')}></li>
          <li className={this.getNoteClassName(79, 'white')}></li>
          <li className={this.getNoteClassName(78, 'black')}></li>
          <li className={this.getNoteClassName(77, 'white')}></li>
          <li className={this.getNoteClassName(76, 'white')}></li>
          <li className={this.getNoteClassName(75, 'black')}></li>
          <li className={this.getNoteClassName(74, 'white')}></li>
          <li className={this.getNoteClassName(73, 'black')}></li>
          <li className={this.getNoteClassName(72, 'white')}></li>
          <li className={this.getNoteClassName(71, 'white')}></li>
          <li className={this.getNoteClassName(70, 'black')}></li>
          <li className={this.getNoteClassName(69, 'white')}></li>
          <li className={this.getNoteClassName(68, 'black')}></li>
          <li className={this.getNoteClassName(67, 'white')}></li>
          <li className={this.getNoteClassName(66, 'black')}></li>
          <li className={this.getNoteClassName(65, 'white')}></li>
          <li className={this.getNoteClassName(64, 'white')}></li>
          <li className={this.getNoteClassName(63, 'black')}></li>
          <li className={this.getNoteClassName(62, 'white')}></li>
          <li className={this.getNoteClassName(61, 'black')}></li>
          <li className={this.getNoteClassName(60, 'white')}></li>
          <li className={this.getNoteClassName(59, 'white')}></li>
          <li className={this.getNoteClassName(58, 'black')}></li>
          <li className={this.getNoteClassName(57, 'white')}></li>
          <li className={this.getNoteClassName(56, 'black')}></li>
          <li className={this.getNoteClassName(55, 'white')}></li>
          <li className={this.getNoteClassName(54, 'black')}></li>
          <li className={this.getNoteClassName(53, 'white')}></li>
          <li className={this.getNoteClassName(52, 'white')}></li>
          <li className={this.getNoteClassName(51, 'black')}></li>
          <li className={this.getNoteClassName(50, 'white')}></li>
          <li className={this.getNoteClassName(49, 'black')}></li>
          {/*
          <li className={this.getNoteClassName(48, 'white')}></li>
          <li className={this.getNoteClassName(47, 'white')}></li>
          <li className={this.getNoteClassName(46, 'black')}></li>
          <li className={this.getNoteClassName(45, 'white')}></li>
          <li className={this.getNoteClassName(44, 'black')}></li>
          <li className={this.getNoteClassName(43, 'white')}></li>
          <li className={this.getNoteClassName(42, 'black')}></li>
          <li className={this.getNoteClassName(41, 'white')}></li>
          <li className={this.getNoteClassName(40, 'white')}></li>
          <li className={this.getNoteClassName(39, 'black')}></li>
          <li className={this.getNoteClassName(38, 'white')}></li>
          <li className={this.getNoteClassName(37, 'black')}></li>
          <li className={this.getNoteClassName(36, 'white')}></li>
          <li className={this.getNoteClassName(35, 'white')}></li>
          <li className={this.getNoteClassName(34, 'black')}></li>
          <li className={this.getNoteClassName(33, 'white')}></li>
          <li className={this.getNoteClassName(32, 'black')}></li>
          <li className={this.getNoteClassName(31, 'white')}></li>
          <li className={this.getNoteClassName(30, 'black')}></li>
          <li className={this.getNoteClassName(29, 'white')}></li>
          <li className={this.getNoteClassName(28, 'white')}></li>
          <li className={this.getNoteClassName(27, 'black')}></li>
          <li className={this.getNoteClassName(26, 'white')}></li>
          <li className={this.getNoteClassName(25, 'black')}></li>
          <li className={this.getNoteClassName(24, 'white')}></li>
          <li className={this.getNoteClassName(23, 'white')}></li>
          <li className={this.getNoteClassName(22, 'black')}></li>
          <li className={this.getNoteClassName(21, 'white')}></li>
          <li className={this.getNoteClassName(20, 'black')}></li>
          <li className={this.getNoteClassName(19, 'white')}></li>
          <li className={this.getNoteClassName(18, 'black')}></li>
          <li className={this.getNoteClassName(17, 'white')}></li>
          <li className={this.getNoteClassName(16, 'white')}></li>
          <li className={this.getNoteClassName(15, 'black')}></li>
          <li className={this.getNoteClassName(14, 'white')}></li>
          <li className={this.getNoteClassName(13, 'black')}></li>
          <li className={this.getNoteClassName(12, 'white')}></li>
          <li className={this.getNoteClassName(11, 'white')}></li>
          <li className={this.getNoteClassName(10, 'black')}></li>
          <li className={this.getNoteClassName(9, 'white')}></li>
          <li className={this.getNoteClassName(8, 'black')}></li>
          <li className={this.getNoteClassName(7, 'white')}></li>
          <li className={this.getNoteClassName(6, 'black')}></li>
          <li className={this.getNoteClassName(5, 'white')}></li>
          <li className={this.getNoteClassName(4, 'white')}></li>
          <li className={this.getNoteClassName(3, 'black')}></li>
          <li className={this.getNoteClassName(2, 'white')}></li>
          <li className={this.getNoteClassName(1, 'black')}></li>
          */}
        </ul>
      </div>
    );
  }
}

export default Keyboard;

Keyboard.propTypes = {
  noteNumber: PropTypes.number,
};
