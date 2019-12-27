import React, { Component, Fragment } from "react";
import RectangleText from "./RectangleText";
import { withPixiApp, Container, Text } from "@inlet/react-pixi";
import PropTypes from "prop-types";

const Mover = withPixiApp(
  class extends Component {
    state = { movement: 800 };
    counter = 0;

    componentDidMount() {
      this.props.app.ticker.add(this.tick);
    }

    componentDidUpdate(prevProps) {
      if (prevProps.isPlaying && !this.props.isPlaying) {
        this.setState({ movement: 800 }, this.props.handleToggleStart);
      }
    }

    componentWillUnmount() {
      this.props.app.ticker.remove(this.tick);
    }

    tick = delta => {
      const { movement } = this.state;
      const { to, isPlaying } = this.props;
      if (movement > to && isPlaying) {
        this.setState({
          movement: this.state.movement - 1 * delta
        });
      }
    };

    render() {
      return this.props.children({
        movement: this.state.movement,
        i: this.counter
      });
    }
  }
);

class ScrollingNotes extends Component {
  getTotalLengthOfNotes = notesToRender => {
    const numberOfNotes = notesToRender.length;
    const lastNote = notesToRender[numberOfNotes - 1];
    return (lastNote.position + lastNote.length) * 100;
  };

  render() {
    const {
      notesToRender,
      currentlyDetectedNoteNumber,
      isPlaying,
      handleToggleStart
    } = this.props;
    const totalLengthOfNotes = this.getTotalLengthOfNotes(notesToRender);
    return (
      <Mover
        to={-totalLengthOfNotes}
        isPlaying={isPlaying}
        handleToggleStart={handleToggleStart}
      >
        {({ movement, i }) => (
          <Fragment>
            <Text
              text={movement}
              x={0}
              y={0}
              style={{
                fontSize: 20,
                fontWeight: 400,
                fill: ["#fff"]
              }}
            />
            <Container x={movement} y={0}>
              <RectangleText
                numberOfRows={40}
                notesToRender={notesToRender}
                currentlyDetectedNoteNumber={currentlyDetectedNoteNumber}
              />
            </Container>
          </Fragment>
        )}
      </Mover>
    );
  }
}

export default ScrollingNotes;

ScrollingNotes.propTypes = {
  notesToRender: PropTypes.array.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  handleToggleStart: PropTypes.func.isRequired,
  currentlyDetectedNoteNumber: PropTypes.number
};
