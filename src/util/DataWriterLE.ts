/**
 * @file Data write to write bytes data sequentially.
 * @copyright Project CHIP Authors 2022
 * @license Apache-2.0
 */

/** Writer that auto-increments its offset after each write. */
export class DataWriterLE {
    private length = 0;
    private readonly chunks = new Array<Uint8Array>();

    writeUInt8(value: number) {
        this.chunks.push(new Uint8Array([value]));
        this.length += 1;
    }
    
    writeUInt16(value: number) {
        const chunk = new Uint8Array(2);
        new DataView(chunk.buffer, 0, 2).setUint16(0, value, true);
        this.chunks.push(chunk);
        this.length += 2;
    }
    
    writeUInt32(value: number) {
        const chunk = new Uint8Array(4);
        new DataView(chunk.buffer, 0, 4).setUint32(0, value, true);
        this.chunks.push(chunk);
        this.length += 4;
    }
    
    writeUInt64(value: number | bigint) {
        const chunk = new Uint8Array(8);
        new DataView(chunk.buffer, 0, 8).setBigUint64(0, typeof value === "number" ? BigInt(value) : value, true);
        this.chunks.push(chunk);
        this.length += 8;
    }

    toBuffer() {
        if (this.chunks.length === 0) return new Uint8Array(0);
        if (this.chunks.length === 1) return this.chunks[0];

        const result = new Uint8Array(this.length);
        let offset = 0;
        this.chunks.forEach(chunck => {
            result.set(chunck, offset);
            offset += chunck.byteLength;
        });
        this.chunks.length = 0;
        this.chunks.push(result);

        return result.buffer;
    }
}