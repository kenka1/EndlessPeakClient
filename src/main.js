import { App } from "./app/app.js"
import { Session } from "./net/session.js";
import { World } from "./game/world.js";
import { Camera } from "./game/camera.js";

async function main() {
    const app = new App();
    await app.init();
    const session = new Session();
    const camera = new Camera();
    const world = new World(app, app.getGameAssets(), camera);
    app.addToScreen(world.getRender());
}

main();