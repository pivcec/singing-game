import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Syllable extends Component {
  getNoteClassName = (currentNote, associatedNote) => {
    let noteClassName;
    if (currentNote === associatedNote) {
      noteClassName = 'syllable active';
    }
    if (currentNote !== associatedNote) {
      noteClassName = 'syllable';
    }
    return noteClassName;
  };

  render() {
    const { syllable, currentNote, associatedNote } = this.props;
    return (
      <span className={this.getNoteClassName(currentNote, associatedNote)}>
        {syllable}
      </span>
    );
  }
}

export default Syllable;

Syllable.propTypes = {
  associatedNote: PropTypes.number.isRequired,
  syllable: PropTypes.string.isRequired,
  currentNote: PropTypes.number.isRequired,
};
