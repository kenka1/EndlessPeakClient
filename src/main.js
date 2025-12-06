import { config } from "./config/config.js";
import { App } from "./app/app.js"
import { Session } from "./net/session.js";
import { World } from "./game/world.js";
import { Camera } from "./game/camera.js";
import { InputManager } from "./app/input_manager.js";

async function main() {

    // Initialzie app
    const app = new App();
    await app.init(config.app);

    // Connect to server
    const session = new Session(config.net);

    // Initialize inputs
    const inputs = new InputManager(session);

    // Game
    const camera = new Camera();
    const world = new World(app, app.getGameAssets(), camera);

    // Render
    app.addToScreen(world.getRender());
}

main();