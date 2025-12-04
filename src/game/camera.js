import { Container } from "pixi.js";

export class Camera {
  constructor() {
    this.container = new Container();
  }

  getRender() { return this.container; }
  addChild(child) { this.container.addChild(child); }
  setX(x) { this.container.x = x; }
  setY(y) { this.container.y = y; }
};