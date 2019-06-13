"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const util_1 = require("util");
let readdir = util_1.promisify(fs.readdir);
let stat = util_1.promisify(fs.stat);
let unlink = util_1.promisify(fs.unlink);
let rmdir = util_1.promisify(fs.rmdir);
let exists = util_1.promisify(fs.exists);
let mkdir = util_1.promisify(fs.mkdir);
class Files {
    static async removeDir(dirPath, removeSelf = true) {
        let status = await stat(dirPath);
        if (!status.isDirectory()) {
            return;
        }
        let files = await readdir(dirPath);
        let len = files.length;
        if (len > 0) {
            let promises = [];
            for (let i = 0; i < len; i++) {
                let filePath = dirPath + '/' + files[i];
                promises.push(Files.removeFile(filePath));
            }
            if (promises.length) {
                await Promise.all(promises);
            }
        }
        if (removeSelf) {
            await rmdir(dirPath);
        }
    }
    static async removeFile(filePath) {
        let status = await stat(filePath);
        if (status.isDirectory()) {
            return Files.removeDir(filePath);
        }
        if (status.isFile()) {
            await unlink(filePath);
        }
    }
    static async createDir(dirPath) {
        let isExists = await exists(dirPath);
        if (!isExists) {
            await mkdir(dirPath);
        }
    }
    static async rerCeateDir(dirPath) {
        await Files.removeDir(dirPath, true);
        await Files.createDir(dirPath);
    }
}
exports.Files = Files;
//# sourceMappingURL=files.js.map