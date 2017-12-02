const PIXI = require('pixi.js');

export function Rectangle(width) {
  let rectangle;
  rectangle = new PIXI.Graphics();
  rectangle.beginFill(0xFFFF00);
  rectangle.drawRect(0, 0, width, 10);
  return rectangle;
}

export function Line(line, moveToX, moveToY, lineToX, lineToY) {
  line = new PIXI.Graphics().lineStyle(1, 0xFF0000);
  line.moveTo(moveToX, moveToY);
  line.lineTo(lineToX, lineToY);
  return line;
}
