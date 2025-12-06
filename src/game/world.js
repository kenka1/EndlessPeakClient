import { 
    Container, 
    mapWebGLBlendModesToPixi 
} from "pixi.js";
import { eventBus } from "../shared/event_bus";
import * as protocol  from "../net/protocol";
import { Player } from "./player";
import { Tile } from "./tile";

export class World {
    gridX;
    gridY;
    tile;
    #app;

    constructor(app, gameAssets, camera) {
        this.#app = app;
        this.gameAssets = gameAssets;
        this.camera = camera;
        this.gridX = this.gameAssets.map_data.grid_x;
        this.gridY = this.gameAssets.map_data.grid_y;
        this.tile = this.gameAssets.map_data.tile;

        // players buffer
        this.players = new Map();

        // world container
        this.container = new Container();

        // add world to camera
        this.camera.addChild(this.container);

        // TODO can not eventBus.off this anonymous function
        eventBus.on("in_packet", packet => this.handlePacket(packet));

        // Load map
        this.loadMap();
    }

    getRender() { return this.camera.getRender(); }

    loadMap() {
        this.map = new Array(this.gridX * this.gridY);
        console.log(`loadMap size: ${this.map.length}`);
        for (let y = 0; y < this.gridY; y++) {
            for (let x = 0; x < this.gridX; x++) {
                const index = y * this.gridX + x;
                if (this.gameAssets.map_data.map[index] != 0) {
                    const tile = new Tile(
                        y * this.gridX + x,
                        x * this.tile, 
                        y * this.tile, 
                        this.tile, 
                        this.tile);
                    this.map[index] = tile;
                    this.container.addChild(tile.getRender());
                } else {
                    this.map[index] = null;
                }
            }
        }
    }

    handlePacket(packet) {
        // console.log("game handle packet");

        const view = new DataView(packet);
        let data = {};

        const opcode = view.getInt16(0, false);
        switch (opcode) {
            case 0x0003:
                console.log("handlePacket(create player)");
                data = protocol.getCreatePlayrData(packet);
                console.log(data);
                this.createMainPlayer(data.id, data.x, data.y, data.width, data.height);
                break;
            case 0x0004:
                console.log("handlePacket(spawn players)");
                data = protocol.getSpawnPlayersData(packet);
                this.spawnPlayers(data.players, data.playersNumber);
                break;
            case 0x0015:
                console.log("handlePacket(move player)");
                data = protocol.getMoveData(packet);
                this.movePlayer(data.id, data.x, data.y);
                break;
            case 0x0016:
                console.log("handlePacket(add player)");
                data = protocol.getAddPlayerData(packet);
                this.addPlayer(data.id, data.x, data.y, data.width, data.height);
                break;
            case 0x0017:
                console.log("handlePacket(rmv player)");
                data = protocol.getRmvPlayerData(packet);
                this.rmvPlayer(data.id);
                break;
            default:
                console.log("handlePacket(unknown opcode)");
        }
    }

    createMainPlayer(id, x, y, width, height) {
        console.log(`createMainPlayer id: ${id}`);
        const player = new Player(id, x, y, width, height);
        this.addPlayerToGame(player);
        this.#app.addCamera(this.camera, player);
    }

    spawnPlayers(players, playersNumber) {
        console.log(`spawnPlayers playersNumber: ${playersNumber}`);
        for (let i = 0; i < playersNumber; i++) {
            const player_data = players[i];

            console.log(`
                spawn player id: ${player_data.id}\n
                x: ${player_data.x}\n
                y: ${player_data.y}\n
                width: ${player_data.width}\n
                height: ${player_data.height}`);

            this.addPlayer(player_data.id, player_data.x, 
                player_data.y, player_data.width, player_data.height);
        }
    }

    movePlayer(id, x, y) {
        // console.log(`movePlayer id: ${id}\n x: ${x}\ny: ${y}`);
        if (this.players.has(id))
            this.players.get(id).translate(x, y);
        else
            console.log("player is not found");
    }

    addPlayer(id, x, y, width, height) {
        console.log(`addPlayer id: ${id}`);
        // const texture = this.gameAssets.player_default;
        const player = new Player(id, x, y, width, height);
        this.addPlayerToGame(player);
    }
    
    rmvPlayer(id) {
        console.log(`rmvPlayer id: ${id}`);
        if (this.players.has(id)) {
            const player = this.players.get(id);
            this.container.removeChild(player.getRender());
            this.players.delete(id);
        } else
            console.log("player is not found");
    }

    addPlayerToGame(player) {
        console.log(`addPlayerToGame id: ${player.getID()}`);
        this.players.set(player.getID(), player);
        this.container.addChild(player.getRender());
    }
};