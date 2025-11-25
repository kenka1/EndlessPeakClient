import { Sprite, Matrix } from "pixi.js";
import { eventBus } from "../shared/event_bus";
import { packets } from "../net/protocol";

export class Player {
    #id;

    constructor(texture, id, x, y) {
        console.log("Player constructor");
        this.sprite = new Sprite(texture);
        this.sprite.anchor.set(0.5);
        this.sprite.x = x;
        this.sprite.y = y;
        this.#id = id;
    }

    getID() { return this.#id; }
    translate(x, y) { 
        this.sprite.x = x;
        this.sprite.y = y;
    };

    setKeyboards() {
        window.addEventListener("keydown", e => {
            switch (e.code) {
                case "KeyW":
                    console.log("press {w}");
                    eventBus.emit("out_packet", packets["moveForward"]);
                    break;
                case "KeyA":
                    console.log("press {a}");
                    eventBus.emit("out_packet", packets["moveLeft"]);
                    break;
                case "KeyS":
                    console.log("press {s}");
                    eventBus.emit("out_packet", packets["moveBackward"]);
                    break;
                case "KeyD":
                    console.log("press {d}");
                    eventBus.emit("out_packet", packets["moveRight"]);
                    break;
                default:
                    console.log("unknown key");
            }
        })
    }
};