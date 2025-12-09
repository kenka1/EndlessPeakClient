import { eventBus } from "../shared/event_bus";

export class Session {
    #hz;

    constructor(config) {
        this.#hz = config.hz;
        // this.socket = new WebSocket("wss://localhost:8080");
        this.socket = new WebSocket("ws://localhost:8080");
        this.socket.binaryType = "arraybuffer";

        this.socket.addEventListener("open", event => {
            console.log("connected!");
        });

        this.socket.addEventListener("message", event => {
            const packet = event.data;
            eventBus.emit("in_packet", packet);
        });

        this.socket.addEventListener("close", event => {
            console.log(`close connection: ${event.reason} code: ${event.code}`);
        });

        // TODO can not eventBus.off this anonymous function
        eventBus.on("out_packet", packet => this.sendPacket(packet));
    }

    sendPacket(packet) { this.socket.send(packet); }

    getHz() { return this.#hz; }
};