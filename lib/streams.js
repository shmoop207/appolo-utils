"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Streams = void 0;
class Streams {
    static async convertToBuffer(stream) {
        return new Promise((resolve, reject) => {
            let buffers = [];
            stream.on('data', (data) => buffers.push(data));
            stream.on('end', () => resolve(Buffer.concat(buffers)));
            stream.on('error', reject);
        });
    }
}
exports.Streams = Streams;
//# sourceMappingURL=streams.js.map