import { 
  Graphics, 
  Container, 
  Text 
} from "pixi.js";

export class Tile {
  #id;

  constructor(id, x, y, width, height) {
    this.container = new Container();
    this.#id = id;

    const tile = new Graphics();
    tile
      .setStrokeStyle({
      width: 1,
      color: '#8d8d8dff'
    })
      .rect(x, y, width, height)
      .fill({color: '#4f5e68c5'})
      .stroke();

    const text = new Text({
      text: id,
      style: {
          fontFamily: 'Arial',
          fontSize: 12,
          fill: '#ffffff85',
      }
    });
    text.x = x;
    text.y = y;

    this.container.addChild(tile);
    this.container.addChild(text);
  }

  getID() { return this.#id; }
  getRender() { return this.container; }
};