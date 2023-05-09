import {Readable} from "stream";

export class Streams {
    public static async convertToBuffer(stream: Readable): Promise<Buffer> {
        return new Promise<Buffer>((resolve, reject) => {
            let buffers: any[] = [];

            stream.on('data', (data) => buffers.push(data));
            stream.on('end', () => resolve(Buffer.concat(buffers)));
            stream.on('error', reject);
        });
    }
}