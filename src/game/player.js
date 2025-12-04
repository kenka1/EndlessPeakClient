import { 
    Sprite, 
    Container, 
    Text,
    Graphics
} from "pixi.js";
import { eventBus } from "../shared/event_bus";
import { packets } from "../net/protocol";

export class Player {
    #id;

    constructor(id, x, y, width, height) {
        this.container = new Container();
        this.#id = id;

        console.log(`Player::constructor:\n
            id: ${id}\n
            x: ${x}\n
            y: ${y}\n
            width: ${width}\n
            height: ${height}`
        );
        // const sprite = new Sprite(texture);
        const tile = new Graphics();
        tile
            .setStrokeStyle({
            width: 1,
            color: '#04c4ffff'
        })
            .rect(0, 0, width, height)
            .fill({color: '#b30539ff'})
            .stroke();

        const text = new Text({
            text: id,
            style: {
                fontFamily: 'Arial',
                fontSize: 12,
                fill: '#ff000085'
            }
        });

        this.container.x = x;
        this.container.y = y;

        this.container.addChild(tile);
        this.container.addChild(text);
    }

    getID() { return this.#id; }
    getRender() { return this.container; }
    getX() { return this.container.x; }
    getY() { return this.container.y; }

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