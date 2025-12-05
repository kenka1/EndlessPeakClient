import { eventBus } from "../shared/event_bus";

export class Session {
    constructor() {
        this.socket = new WebSocket("wss://localhost:8080");
        this.socket.binaryType = "arraybuffer";

        this.socket.addEventListener("open", event => {
            console.log("connected!");
        })

        this.socket.addEventListener("message", event => {
            // console.log(`recv: ${event.data.byteLength} bytes`);
            const packet = event.data;
            // TODO fix this error
            eventBus.emit("in_packet", packet);
        })

        // TODO can not eventBus.off this anonymous function
        eventBus.on("out_packet", packet => this.sendPacket(packet));
    }

    sendPacket(packet) {
        // console.log("send packet to server");
        this.socket.send(packet);
    }
};