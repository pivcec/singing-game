import { Text, Sprite, Texture, Container } from "pixi.js";
import { PixiComponent } from "@inlet/react-pixi";

export default PixiComponent("RectangleText", {
  create: props => {
    return new Container();
  },
  didMount: (instance, parent) => {
    // apply custom logic on mount
  },
  willUnmount: (instance, parent) => {
    // clean up before removal
  },
  applyProps: (instance, oldProps, newProps) => {
    const {
      numberOfRows,
      notesToRender,
      currentlyDetectedNoteNumber
    } = newProps;

    let i;
    for (i = 0; i < numberOfRows; i++) {
      const rowNote = 80 - i;
      const y = i * 20;
      notesToRender.forEach(note => {
        const tint =
          note.noteNumber === currentlyDetectedNoteNumber ? 0xff0000 : 0xfff000;
        const width = note.length * 100;
        const x = note.position * 100;
        if (note.noteNumber === rowNote) {
          const textSprite = new Text(note.lyric, {
            fill: "#000",
            fontStyle: "italic"
          });
          const txtBG = new Sprite(Texture.WHITE);
          textSprite.x = x;
          textSprite.y = y;
          textSprite.anchor.set(-0.1, 0);
          textSprite.height = 20;
          txtBG.x = x;
          txtBG.y = y;
          txtBG.width = width;
          txtBG.height = 20;
          txtBG.tint = tint;
          instance.addChild(txtBG, textSprite);
        }
      });
    }
  }
});
