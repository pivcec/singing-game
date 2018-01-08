const PIXI = require('pixi.js');

export function Rectangle(width) {
  let rectangle;
  rectangle = new PIXI.Graphics();
  rectangle.beginFill(0xFFFF00);
  rectangle.drawRect(0, 0, width, 10);
  return rectangle;
}

export function Line(line, moveToX, moveToY, lineToX, lineToY, colour) {
  line = new PIXI.Graphics().lineStyle(1, colour);
  line.moveTo(moveToX, moveToY);
  line.lineTo(lineToX, lineToY);
  return line;
}
