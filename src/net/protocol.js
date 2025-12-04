export const packets = {};

packets["moveForward"] = makeMovePacket(0x0011);
packets["moveLeft"] = makeMovePacket(0x0012);
packets["moveBackward"] = makeMovePacket(0x0013);
packets["moveRight"] = makeMovePacket(0x0014);

function makeMovePacket(opcode) {
    const packet = new ArrayBuffer(6);   
    const view = new DataView(packet);

    view.setUint16(0, opcode);
    view.setUint32(2, 0x0);

    return packet;
}

export function getCreatePlayrData(packet) {
    const view = new DataView(packet);
    const data = {};
    data.id = view.getBigUint64(6, false);
    data.x = view.getFloat64(14, false);
    data.y = view.getFloat64(22, false);
    data.width = view.getUint8(30, false);
    data.height = view.getUint8(31, false);
    return data;
}

export function getAddPlayerData(packet) {
    const view = new DataView(packet);
    const data = {};
    data.id = view.getBigUint64(6, false);
    data.x = view.getFloat64(14, false);
    data.y = view.getFloat64(22, false);
    data.width = view.getUint8(30, false);
    data.height = view.getUint8(31, false);
    return data;
}

export function getRmvPlayerData(packet) {
    const view = new DataView(packet);
    const data = {};
    data.id = view.getBigUint64(6, false);
    return data;
}

export function getSpawnPlayersData(packet) {
    const view = new DataView(packet);
    const data = {};

    const playersNumber = view.getBigUint64(6, false);
    console.log(`number of players: ${playersNumber}`);
    data.playersNumber = playersNumber;

    data.players = [];
    for (let i = 0; i < playersNumber; i++) {
        const offset = 24 * i;
        const player = {};
        player.id = view.getBigUint64(14 + offset, false);
        player.x = view.getFloat64(22 + offset, false);
        player.y = view.getFloat64(30 + offset, false);
        player.width = view.getUint8(38 + offset, false);
        player.height = view.getUint8(39 + offset, false);
        data.players[i] = player;
    }
    console.log(data);
    return data;
}

export function getMoveData(packet) {
    const view = new DataView(packet);
    const data = {};
    data.id = view.getBigUint64(6, false);
    data.x = view.getFloat64(14, false);
    data.y = view.getFloat64(22, false);
    return data;
}