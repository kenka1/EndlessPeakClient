import { Container } from "pixi.js";
import { eventBus } from "../shared/event_bus";
import * as protocol  from "../net/protocol";
import { Player } from "./player";

export class World {
    constructor(gameAssets) {
        this.gameAssets = gameAssets;
        this.players = [];
        this.container = new Container();

        // TODO can not eventBus.off this anonymous function
        eventBus.on("in_packet", packet => this.handlePacket(packet));
    }

    handlePacket(packet) {
        console.log("game handle packet");

        const view = new DataView(packet);

        const opcode = view.getInt16(0, false);
        switch (opcode) {
            case 0x0003:
                console.log("handlePacket(create player)");
                this.createMainPlayer(protocol.getCreatePlayrData(packet));
                break;
            // case 0x0004:
            //     console.log("handlePacket(spawn players)");
            //     this.spawnPlayers(protocol.getSpawnPlayersData(packet));
                break;
            case 0x0011:
                console.log("handlePacket(move forward)");
                break;
            case 0x0012:
                console.log("handlePacket(move left)");
                break;
            case 0x0013:
                console.log("handlePacket(move backward)");
                break
            case 0x0014:
                console.log("handlePacket(move left)");
                break;
            case 0x0015:
                console.log("handlePacket(move player)");
                this.movePlayer(protocol.getMoveData(packet));
                break;
            case 0x0016:
                console.log("handlePacket(add player)");
                this.createPlayer(protocol.getAddPlayerData(packet));
                break;
            default:
                console.log("handlePacket(unknown opcode)");
        }
    }

    createMainPlayer(data) {
        const player = new Player(this.gameAssets.player_default, data.id, data.x, data.y);
        player.setKeyboards();
        this.addPlayerToGame(player);
    }

    // spawnPlayers(data) {
    //     for (let i = 0; i < data.number; i++) {
            
    //     }
    // }

    createPlayer(data) {
        const player = new Player(this.gameAssets.player_default, data.id, data.x, data.y);
        this.addPlayerToGame(player);
    }

    movePlayer(data) {
        console.log(`id: ${data.id}`);
        console.log(`x: ${data.x}`);
        console.log(`y: ${data.y}`);

        const player = this.players.find(player => player.getID() == data.id );
        if (player != undefined)
            player.translate(data.x, data.y);
        else
            console.log("player is not found");
    }

    addPlayerToGame(player) {
        this.players.push(player);
        this.container.addChild(player.sprite);
    }
};