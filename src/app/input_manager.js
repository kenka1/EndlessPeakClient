import { eventBus } from "../shared/event_bus";
import { packets } from "../net/protocol";

export class InputManager {
  #session;
  #keys;

  constructor(session) {
    this.#session = session;
    this.#keys = new Set();

    window.addEventListener("keydown", e => this.#keys[e.code] = true);
    window.addEventListener("keyup", e => this.#keys[e.code] = false);

    setInterval(() => {
      if (this.#keys["KeyA"] == true) eventBus.emit("out_packet", packets["moveLeft"]);
      if (this.#keys["KeyD"] == true) eventBus.emit("out_packet", packets["moveRight"]);
      if (this.#keys["KeyW"] == true) eventBus.emit("out_packet", packets["Jump"]);
    }, this.#session.getHz());
  }
};