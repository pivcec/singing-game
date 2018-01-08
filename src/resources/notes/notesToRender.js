/*
width - length of note in milliseconds / 10
height - always 10
positionX = start position of note from beginning of song in milliseconds / 10
positionY = +10 added to every note in reverse order from #88 - which has a value of 0
*/

const notesToRender = [
  { noteNumber:60, width:97, positionX:400, positionY:280 },
  { noteNumber:58, width:97, positionX:500, positionY:300 },
  { noteNumber:56, width:97, positionX:600, positionY:320 },
  { noteNumber:58, width:97, positionX:700, positionY:300 },
  { noteNumber:60, width:97, positionX:800, positionY:280 },
  { noteNumber:60, width:97, positionX:900, positionY:280 },
  { noteNumber:60, width:197, positionX:1000, positionY:280 },
  { noteNumber:58, width:97, positionX:1200, positionY:300 },
  { noteNumber:58, width:97, positionX:1300, positionY:300 },
  { noteNumber:58, width:197, positionX:1400, positionY:300 },
  { noteNumber:60, width:97, positionX:1600, positionY:280 },
  { noteNumber:63, width:97, positionX:1700, positionY:250 },
  { noteNumber:63, width:197, positionX:1800, positionY:250 },
  { noteNumber:60, width:97, positionX:2000, positionY:280 },
  { noteNumber:58, width:97, positionX:2100, positionY:300 },
  { noteNumber:56, width:97, positionX:2200, positionY:320 },
  { noteNumber:58, width:97, positionX:2300, positionY:300 },
  { noteNumber:60, width:97, positionX:2400, positionY:280 },
  { noteNumber:60, width:97, positionX:2500, positionY:280 },
  { noteNumber:60, width:97, positionX:2600, positionY:280 },
  { noteNumber:60, width:97, positionX:2700, positionY:280 },
  { noteNumber:58, width:97, positionX:2800, positionY:300 },
  { noteNumber:58, width:97, positionX:2900, positionY:300 },
  { noteNumber:60, width:97, positionX:3000, positionY:280 },
  { noteNumber:58, width:97, positionX:3100, positionY:300 },
  { noteNumber:56, width:397, positionX:3200, positionY:320 },
];

export default notesToRender;
