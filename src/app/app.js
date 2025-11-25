import { Application, Assets } from "pixi.js";

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

    addSprite(sprite) {
        this.app.stage.addChild(sprite);
    }

    getGameAssets() { return this.gameAssets; }
};