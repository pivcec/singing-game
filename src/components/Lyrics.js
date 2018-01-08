import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lyric from './Lyric';
import lyricsToRender from '../resources/lyrics/lyricsToRender';

class Lyrics extends Component {
  shouldComponentUpdate(nextProps) {
    const { currentNote, currentBar } = this.props;
    if (currentNote !== nextProps.currentNote || currentBar !== nextProps.currentBar) {
      return true;
    }
    return false;
  }

  checkCurrentBar = (lyric, i) => {
    const { currentBar, currentNote } = this.props;
    if (lyric.bar === currentBar) {
      return (
        <Lyric
          syllables={lyric.syllables}
          key={i}
          currentNote={currentNote} />
      );
    }
  };

  getLine = (lyricsToRender) => {
    const line = lyricsToRender.map((lyric, i) =>
      this.checkCurrentBar(lyric, i)
    );
    return line;
  }

  render() {
    return (
      <div className={"lyrics"}>
        <span className={"line"}>
          {lyricsToRender &&
            this.getLine(lyricsToRender)
          }
        </span>
      </div>
    );
  }
}

export default Lyrics;

Lyrics.propTypes = {
  currentNote: PropTypes.number.isRequired,
  currentBar: PropTypes.number.isRequired,
};
