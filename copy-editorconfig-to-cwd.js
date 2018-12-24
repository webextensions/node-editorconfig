#!/usr/bin/env node

var fs = require('fs'),
    path = require('path');

var cpFile = require('cp-file');

var cwd = process.cwd(),
    sourcePath = path.resolve(__dirname, '.editorconfig'),
    targetPath = path.resolve(cwd, '.editorconfig');

var writeToFile = false,
    overwriting = false;

if (fs.existsSync(targetPath)) {
    if (process.argv.indexOf('--overwrite') !== -1) {
        writeToFile = true;
        overwriting = true;
    } else {
        console.info(' ✓ .editorconfig file already exists at ' + targetPath);
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
            console.info(' ✓ .editorconfig file overwritten at ' + targetPath);
        } else {
            console.info(' ✓ .editorconfig file added at ' + targetPath);
        }
    } catch (e) {
        console.error(
            '\n ✗ Unable to write .editorconfig file at ' + targetPath +
            '\n' +
            '\n Error details' +
            '\n ============='
        );
        setTimeout(function () {
            console.error(e);
            console.log('');
        }, 750);
    }
}
