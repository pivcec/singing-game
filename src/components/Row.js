import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import notesToRender from "../resources/notesToRender";

const Container = styled.div`
position: relative;
  display: flex;
  height: 20px
  width: 100%;
`;

const Cell = styled.div`
  position: absolute;
  background-color: yellow;
  left: ${props => props.position * 100}px;
  width: ${props => props.length * 100}px;
`;

class Row extends Component {
  componentDidUpdate() {
    const { currentlyDetectedNoteNumber } = this.props;
    /*
    if (currentlyDetectedNoteNumber) {
      console.log("currentlyDetectedNoteNumber", currentlyDetectedNoteNumber);
    }
    */
  }

  render() {
    const { noteNumberOfRow } = this.props;
    return (
      <Container>
        {notesToRender.map((note, i) => {
          if (noteNumberOfRow === note.noteNumber) {
            return (
              <Cell key={i} length={note.length} position={note.position}>
                {note.lyric}
              </Cell>
            );
          }
          return null;
        })}
      </Container>
    );
  }
}

export default Row;

Row.propTypes = {
  noteNumberOfRow: PropTypes.number.isRequired,
  currentlyDetectedNoteNumber: PropTypes.number
};
