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
      color: '#ff0404ff'
    })
      .rect(x, y, width, height)
      .fill({color: '#1190a1c5'})
      .stroke();

    const text = new Text({
      text: id,
      style: {
          fontFamily: 'Arial',
          fontSize: 12,
          fill: '#ff000085',
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