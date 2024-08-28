#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const cpFile = require('cp-file');

const cwd = process.cwd();
const sourcePath = path.resolve(__dirname, '.editorconfig');
const targetPath = path.resolve(cwd, '.editorconfig');

let writeToFile = false;
let overwriting = false;

if (fs.existsSync(targetPath)) {
    if (process.argv.indexOf('--overwrite') !== -1) {
        writeToFile = true;
        overwriting = true;
    } else {
        console.info(' ✔ .editorconfig file already exists at ' + targetPath);
        console.info(
            '\n Note' +
            '\n ====' +
            '\n You may wish to use --overwrite parameter to update the .editorconfig file' +
            '\n'
        );
    }
} else {
    writeToFile = true;
}

if (writeToFile) {
    try {
        cpFile.sync(sourcePath, targetPath);
        if (overwriting) {
            console.info(' ✔ .editorconfig file overwritten at ' + targetPath);
        } else {
            console.info(' ✔ .editorconfig file added at ' + targetPath);
        }
    } catch (e) {
        console.error(
            '\n ✗ Unable to write .editorconfig file at ' + targetPath +
            '\n' +
            '\n Error details' +
            '\n ============='
        );

        console.error(e);
        console.log('');

        console.error('Aborting with exit code 1');
        process.exit(1);
    }
}
