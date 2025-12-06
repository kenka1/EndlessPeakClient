import { 
    Application, 
    Assets,
    Text
} from "pixi.js";

export class App {
    async init(config) {
        this.app = new Application();

        await this.app.init({
            width: config.width,
            height: config.height,
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

    addToScreen(child) { this.app.stage.addChild(child); }

    getGameAssets() { return this.gameAssets; }

    updateFPS() {
        this.app.ticker.add(() => {
            this.fps.text = this.app.ticker.FPS;
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
    }

};