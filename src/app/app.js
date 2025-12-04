import { 
    Application, 
    Assets 
} from "pixi.js";
import { Camera } from "../game/camera";

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
    }

    addToScreen(child) {
        this.app.stage.addChild(child);
    }

    getGameAssets() { return this.gameAssets; }

    addCamera(camera, player) {
        this.app.ticker.add(() => {
            this.#moveCamera(camera, player);
        });
    }

    #moveCamera(camera, player) {
        camera.setX(-player.getX() + this.app.screen.width / 2);
        camera.setY(-player.getY() + this.app.screen.height / 2);
        console.log(`moveCamera:\nplayer.x: ${player.getX()}\nplayer.y: ${player.getY()}`);
    }

};