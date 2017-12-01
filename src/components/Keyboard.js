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
      return 'active';
    } else if (noteColour === 'white') {
      return 'white';
    } else {
      return 'black';
    }
  };
  render() {
    return (
      <div className={"keyboard"}>
        <ul>
          <li className={this.getNoteClassName(88, 'white')}></li>
          <li className={this.getNoteClassName(87, 'white')}></li>
          <li className={this.getNoteClassName(86, 'black')}></li>
          <li className={this.getNoteClassName(85, 'white')}></li>
          <li className={this.getNoteClassName(84, 'black')}></li>
          <li className={this.getNoteClassName(83, 'white')}></li>
          <li className={this.getNoteClassName(82, 'black')}></li>
          <li className={this.getNoteClassName(81, 'white')}></li>
          <li className={this.getNoteClassName(80, 'white')}></li>
          <li className={this.getNoteClassName(79, 'black')}></li>
          <li className={this.getNoteClassName(78, 'white')}></li>
          <li className={this.getNoteClassName(77, 'black')}></li>
          <li className={this.getNoteClassName(76, 'white')}></li>
          <li className={this.getNoteClassName(75, 'white')}></li>
          <li className={this.getNoteClassName(74, 'black')}></li>
          <li className={this.getNoteClassName(73, 'white')}></li>
          <li className={this.getNoteClassName(72, 'black')}></li>
          <li className={this.getNoteClassName(71, 'white')}></li>
          <li className={this.getNoteClassName(70, 'black')}></li>
          <li className={this.getNoteClassName(69, 'white')}></li>
          <li className={this.getNoteClassName(68, 'white')}></li>
          <li className={this.getNoteClassName(67, 'black')}></li>
          <li className={this.getNoteClassName(66, 'white')}></li>
          <li className={this.getNoteClassName(65, 'black')}></li>
          <li className={this.getNoteClassName(64, 'white')}></li>
          <li className={this.getNoteClassName(63, 'white')}></li>
          <li className={this.getNoteClassName(62, 'black')}></li>
          <li className={this.getNoteClassName(61, 'white')}></li>
          <li className={this.getNoteClassName(60, 'black')}></li>
          <li className={this.getNoteClassName(59, 'white')}></li>
          <li className={this.getNoteClassName(58, 'black')}></li>
          <li className={this.getNoteClassName(57, 'white')}></li>
          <li className={this.getNoteClassName(56, 'white')}></li>
          <li className={this.getNoteClassName(55, 'black')}></li>
          <li className={this.getNoteClassName(54, 'white')}></li>
          <li className={this.getNoteClassName(53, 'black')}></li>
          <li className={this.getNoteClassName(52, 'white')}></li>
          <li className={this.getNoteClassName(51, 'white')}></li>
          <li className={this.getNoteClassName(50, 'black')}></li>
          <li className={this.getNoteClassName(49, 'white')}></li>
          {/*
          <li className={this.getNoteClassName(48, 'black')}></li>
          <li className={this.getNoteClassName(47, 'white')}></li>
          <li className={this.getNoteClassName(46, 'black')}></li>
          <li className={this.getNoteClassName(45, 'white')}></li>
          <li className={this.getNoteClassName(44, 'white')}></li>
          <li className={this.getNoteClassName(43, 'black')}></li>
          <li className={this.getNoteClassName(42, 'white')}></li>
          <li className={this.getNoteClassName(41, 'black')}></li>
          <li className={this.getNoteClassName(40, 'white')}></li>
          <li className={this.getNoteClassName(39, 'white')}></li>
          <li className={this.getNoteClassName(38, 'black')}></li>
          <li className={this.getNoteClassName(37, 'white')}></li>
          <li className={this.getNoteClassName(36, 'black')}></li>
          <li className={this.getNoteClassName(35, 'white')}></li>
          <li className={this.getNoteClassName(34, 'black')}></li>
          <li className={this.getNoteClassName(33, 'white')}></li>
          <li className={this.getNoteClassName(32, 'white')}></li>
          <li className={this.getNoteClassName(31, 'black')}></li>
          <li className={this.getNoteClassName(30, 'white')}></li>
          <li className={this.getNoteClassName(29, 'black')}></li>
          <li className={this.getNoteClassName(28, 'white')}></li>
          <li className={this.getNoteClassName(27, 'white')}></li>
          <li className={this.getNoteClassName(26, 'black')}></li>
          <li className={this.getNoteClassName(25, 'white')}></li>
          <li className={this.getNoteClassName(24, 'black')}></li>
          <li className={this.getNoteClassName(23, 'white')}></li>
          <li className={this.getNoteClassName(22, 'black')}></li>
          <li className={this.getNoteClassName(21, 'white')}></li>
          <li className={this.getNoteClassName(20, 'white')}></li>
          <li className={this.getNoteClassName(19, 'black')}></li>
          <li className={this.getNoteClassName(18, 'white')}></li>
          <li className={this.getNoteClassName(17, 'black')}></li>
          <li className={this.getNoteClassName(16, 'white')}></li>
          <li className={this.getNoteClassName(15, 'white')}></li>
          <li className={this.getNoteClassName(14, 'black')}></li>
          <li className={this.getNoteClassName(13, 'white')}></li>
          <li className={this.getNoteClassName(12, 'black')}></li>
          <li className={this.getNoteClassName(11, 'white')}></li>
          <li className={this.getNoteClassName(10, 'black')}></li>
          <li className={this.getNoteClassName(9, 'white')}></li>
          <li className={this.getNoteClassName(8, 'white')}></li>
          <li className={this.getNoteClassName(7, 'black')}></li>
          <li className={this.getNoteClassName(6, 'white')}></li>
          <li className={this.getNoteClassName(5, 'black')}></li>
          <li className={this.getNoteClassName(4, 'white')}></li>
          <li className={this.getNoteClassName(3, 'white')}></li>
          <li className={this.getNoteClassName(2, 'black')}></li>
          <li className={this.getNoteClassName(1, 'white')}></li>
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
