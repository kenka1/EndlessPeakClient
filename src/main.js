import { App } from "./app/app.js"
import { Session } from "./net/session.js";
import { World } from "./game/world.js";

async function main() {
    const app = new App();
    await app.init();
    const session = new Session();
    const world = new World(app.getGameAssets());
    app.addSprite(world.container);
}

main();