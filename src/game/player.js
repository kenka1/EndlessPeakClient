import { Sprite, Container, Text } from "pixi.js";
import { eventBus } from "../shared/event_bus";
import { packets } from "../net/protocol";

export class Player {
    #id;

    constructor(texture, id, x, y) {
        this.container = new Container();

        console.log("Player constructor");
        const sprite = new Sprite(texture);
        const text = new Text({
            text: id,
            style: {
                fontFamily: 'Arial',
                fontSize: 14,
                fill: 0xff1010,
            }
        });

        this.container.addChild(sprite);
        this.container.addChild(text);

        this.container.x = x;
        this.container.y = y;


        this.#id = id;
    }

    getID() { return this.#id; }

    getRender() { return this.container; }

    translate(x, y) { 
        this.container.x = x;
        this.container.y = y;
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