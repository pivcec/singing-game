const PIXI = require('pixi.js');

export function Rectangle(rectangle) {
  rectangle = new PIXI.Graphics();
  rectangle.beginFill(0xFFFF00);
  rectangle.drawRect(0, 0, 150, 10);
  rectangle.position.x = 600;
  rectangle.position.y = 300;
  return rectangle;
}

export function Line(line, moveToX, moveToY, lineToX, lineToY) {
  line = new PIXI.Graphics().lineStyle(1, 0xFF0000);
  line.moveTo(moveToX, moveToY);
  line.lineTo(lineToX, lineToY);
  return line;
}


/*
Far.prototype = Object.create(PIXI.extras.TilingSprite.prototype);
Far.prototype.update = function() {
  this.tilePosition.x -= 0.128;
}
*/
