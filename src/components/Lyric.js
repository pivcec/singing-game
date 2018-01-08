import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Syllable from './Syllable';

class Lyric extends Component {
  checkCurrentNote = (syllable, i) => {
    return (
      <Syllable
        key={i}
        associatedNote={syllable.associatedNote}
        syllable={syllable.syllable}
        currentNote={this.props.currentNote} />
    );
  }

  processSyllables = (syllables) => {
    const lyric = syllables.map((syllable, i) =>
      this.checkCurrentNote(syllable, i),
    );
    return lyric;
  }

  render() {
    const { syllables } = this.props;
    const lyric = this.processSyllables(syllables);
    return (
      <span className="lyric">{lyric}</span>
    );
  }
}

export default Lyric;

Lyric.propTypes = {
  syllables: PropTypes.array.isRequired,
  currentNote: PropTypes.number.isRequired,
};
