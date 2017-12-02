/*
note has
  width
  height is always 10
  positionX = milliseconds from beginning of song / 10
  positionY = frequency - return value of getNotePositionY(noteNumber);
*/

const notesToRender = [
  { noteNumber:51, width:300, positionX:100, positionY:370 },
  { noteNumber:55, width:300, positionX:700, positionY:330 },
  { noteNumber:59, width:300, positionX:1100, positionY:290 },
  { noteNumber:63, width:300, positionX:1500, positionY:250 },
  { noteNumber:51, width:300, positionX:1900, positionY:370 },
  { noteNumber:55, width:300, positionX:2300, positionY:330 },
  { noteNumber:59, width:300, positionX:2700, positionY:290 },
  { noteNumber:63, width:300, positionX:3100, positionY:250 },
  { noteNumber:51, width:300, positionX:3500, positionY:370 },
  { noteNumber:55, width:300, positionX:3900, positionY:330 },
  { noteNumber:59, width:300, positionX:4300, positionY:290 },
  { noteNumber:63, width:300, positionX:4700, positionY:250 },
  { noteNumber:51, width:300, positionX:5100, positionY:370 },
  { noteNumber:55, width:300, positionX:5500, positionY:330 },
  { noteNumber:59, width:300, positionX:5900, positionY:290 },
  { noteNumber:63, width:300, positionX:6300, positionY:250 },
];

export default notesToRender;
