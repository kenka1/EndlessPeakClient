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
    return data;
}

export function getSpawnPlayersData(packet) {
    const view = new DataView(packet);
}

export function getMoveData(packet) {
    const view = new DataView(packet);
    const data = {};
    data.id = view.getBigUint64(6, false);
    data.x = view.getFloat64(14, false);
    data.y = view.getFloat64(22, false);
    return data;
}