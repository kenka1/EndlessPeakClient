import { Container } from "pixi.js";
import { eventBus } from "../shared/event_bus";
import * as protocol  from "../net/protocol";
import { Player } from "./player";

export class World {
    constructor(gameAssets) {
        this.gameAssets = gameAssets;
        this.players = new Map();
        this.container = new Container();

        // TODO can not eventBus.off this anonymous function
        eventBus.on("in_packet", packet => this.handlePacket(packet));
    }

    handlePacket(packet) {
        console.log("game handle packet");

        const view = new DataView(packet);
        let data = {};

        const opcode = view.getInt16(0, false);
        switch (opcode) {
            case 0x0003:
                console.log("handlePacket(create player)");
                data = protocol.getCreatePlayrData(packet);
                console.log(data);
                this.createMainPlayer(data.id, data.x, data.y);
                break;
            case 0x0004:
                console.log("handlePacket(spawn players)");
                data = protocol.getSpawnPlayersData(packet);
                this.spawnPlayers(data.players, data.playersNumber);
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
                data = protocol.getMoveData(packet);
                this.movePlayer(data.id, data.x, data.y);
                break;
            case 0x0016:
                console.log("handlePacket(add player)");
                data = protocol.getAddPlayerData(packet);
                this.addPlayer(data.id, data.x, data.y);
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

    createMainPlayer(id, x, y) {
        console.log(`createMainPlayer id: ${id}`);
        const player = new Player(this.gameAssets.player_default, id, x, y);
        player.setKeyboards();
        this.addPlayerToGame(player);
    }

    spawnPlayers(players, playersNumber) {
        console.log(`spawnPlayers playersNumber: ${playersNumber}`);
        for (let i = 0; i < playersNumber; i++) {
            const player_data = players[i];
            console.log(`spawn player id: ${player_data.id} x: ${player_data.x} y: ${player_data.y}`);
            const player = new Player(
                this.gameAssets.player_default, 
                player_data.id, player_data.x, player_data.y);
            this.addPlayerToGame(player);
        }
    }

    movePlayer(id, x, y) {
        console.log(`movePlayer id: ${id}`);
        if (this.players.has(id))
            this.players.get(id).translate(x, y);
        else
            console.log("player is not found");
    }

    addPlayer(id, x, y) {
        console.log(`addPlayer id: ${id}`);
        const player = new Player(this.gameAssets.player_default, id, x, y);
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