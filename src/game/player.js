import { 
    Container, 
    Text,
    Graphics
} from "pixi.js";

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
            color: '#ffffffff'
        })
            .rect(0, 0, width, height)
            .fill({color: '#e94200ff'})
            .stroke();

        const text = new Text({
            text: id,
            style: {
                fontFamily: 'Arial',
                fontSize: 12,
                fill: '#ffffff85'
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
};