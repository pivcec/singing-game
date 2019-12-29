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
  const { firstKey, lastKey, currentlyDetectedNoteNumber } = props;
  return (
    <div>
      {keys.map((key, i) => {
        if (key.noteNumber >= firstKey && key.noteNumber <= lastKey) {
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
  firstKey: PropTypes.number.isRequired,
  lastKey: PropTypes.number.isRequired,
  currentlyDetectedNoteNumber: PropTypes.number
};
