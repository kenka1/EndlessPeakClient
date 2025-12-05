import { 
    Application, 
    Assets,
    Text
} from "pixi.js";
import { Camera } from "../game/camera";
import { eventBus } from "../shared/event_bus";
import { packets } from "../net/protocol";

export class App {
    async init() {
        this.app = new Application();

        await this.app.init({
            width: 600,
            height: 600,
        });

        document.body.appendChild(this.app.canvas);

        await Assets.init({ manifest: '/manifest.json' });
        this.gameAssets = await Assets.loadBundle("game");

        this.fps = new Text({
            text: this.app.ticker.FPS,
            style: {
                fontFamily: 'Arial',
                fontSize: 30,
                fill: '#ff000085'
            }
        });
        this.app.stage.addChild(this.fps);
        this.updateFPS();
    }

    addToScreen(child) {
        this.app.stage.addChild(child);
    }

    getGameAssets() { return this.gameAssets; }

    updateFPS() {
        this.app.ticker.add(() => {
            this.fps.text = this.app.ticker.FPS;
        });
    }

    setKeyboards() {
        this.keys = {};
        console.log('setKeyboards');
        window.addEventListener("keydown", e => this.keys[e.code] = true);
        window.addEventListener("keyup", e => this.keys[e.code] = false);
        this.app.ticker.add(() => {
            if (this.keys["KeyA"] == true) eventBus.emit("out_packet", packets["moveLeft"]);
            if (this.keys["KeyD"] == true) eventBus.emit("out_packet", packets["moveRight"]);
            if (this.keys["KeyW"] == true) eventBus.emit("out_packet", packets["Jump"]);
        });
    }

    addCamera(camera, player) {
        this.app.ticker.add(() => {
            this.#moveCamera(camera, player);
        });
    }


    #moveCamera(camera, player) {
        camera.setX(-player.getX() + this.app.screen.width / 2);
        camera.setY(-player.getY() + this.app.screen.height / 2);
        // console.log(`moveCamera:\nplayer.x: ${player.getX()}\nplayer.y: ${player.getY()}`);
    }

};