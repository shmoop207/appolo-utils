import * as fs from "fs";
import {promisify} from "util";

let readdir = promisify(fs.readdir);
let stat = promisify(fs.stat);
let unlink = promisify(fs.unlink);
let rmdir = promisify(fs.rmdir);
let exists = promisify(fs.exists);
let mkdir = promisify(fs.mkdir);

export class Files {
    public static async removeDir(dirPath: string, removeSelf: boolean = true): Promise<void> {


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

    public static async removeFile(filePath: string): Promise<void> {
        let status = await stat(filePath);

        if (status.isDirectory()) {
            return Files.removeDir(filePath);
        }

        if (status.isFile()) {
            await unlink(filePath)
        }
    }

    public static async createDir(dirPath: string): Promise<void> {

        let isExists = await exists(dirPath);

        if (!isExists) {
            await mkdir(dirPath);
        }
    }

    public static async rerCeateDir(dirPath: string): Promise<void> {
        await Files.removeDir(dirPath, true);

        await Files.createDir(dirPath);

    }
}
