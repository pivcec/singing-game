import React from "react";
import styled from "styled-components";
import keys from "../resources/keys";
import PropTypes from "prop-types";

const Key = styled.div`
  height: 18px;
  width: 50px;
  background-color: ${props =>
    props.noteNumber === props.currentlyDetectedNoteNumber
      ? "red"
      : props.color};
  border: 1px solid grey;
`;

const Keyboard = props => {
  const { firstNote, lastNote, currentlyDetectedNoteNumber } = props;
  return (
    <div>
      {keys.map((key, i) => {
        if (key.noteNumber <= firstNote && key.noteNumber >= lastNote) {
          return (
            <Key
              key={i}
              color={key.color}
              currentlyDetectedNoteNumber={currentlyDetectedNoteNumber}
              noteNumber={key.noteNumber}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default Keyboard;

Keyboard.propTypes = {
  firstNote: PropTypes.number.isRequired,
  lastNote: PropTypes.number.isRequired,
  currentlyDetectedNoteNumber: PropTypes.number
};
